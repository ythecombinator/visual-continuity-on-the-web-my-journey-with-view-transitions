import { useEffect, useMemo, useRef } from "react";
import { useForm } from "@tanstack/react-form";
import { Layout } from "@/components/layout";
import { QuestionRenderer } from "@/components/question-renderer";
import { SurveyNav } from "@/components/survey-nav";
import {
  getAdjacentSteps,
  questionTransitionName,
  type SurveyStep,
} from "@/data/survey";
import { fieldErrorMessage } from "@/shared/form-errors";
import { valuesFromFormElement } from "@/shared/form-data";
import { buildStepSchema, type StepFormValues } from "@/shared/survey-schema";
import {
  emptyStepValues,
  loadStepValues,
  navigateAfterPersist,
  persistSurveyAnswers,
} from "@/shared/survey-storage";
import type { AnswerValue } from "@/shared/survey-answers";
import { runViewTransition } from "@/shared/view-transition";

const FORM_ID = "survey-step-form";

interface StepPageProps {
  step: SurveyStep;
}

export function StepPage({ step }: StepPageProps) {
  const pendingValuesRef = useRef<StepFormValues | null>(null);
  const { prevHref, nextHref, isLast, index } = getAdjacentSteps(step.slug);
  const backHref = prevHref ?? "/";
  const schema = useMemo(() => buildStepSchema(step), [step]);
  const defaultValues = useMemo(() => emptyStepValues(step), [step]);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: ({ value }) => {
        const parsed = schema.safeParse(value);
        if (parsed.success) return undefined;

        const fieldErrors: Partial<Record<keyof StepFormValues, string>> = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0];
          if (typeof key === "string" && !fieldErrors[key]) {
            fieldErrors[key] = issue.message;
          }
        }
        return { fields: fieldErrors };
      },
    },
    onSubmit: async () => {
      const values = pendingValuesRef.current ?? form.state.values;
      const finishing = isLast;
      const result = persistSurveyAnswers(values, {
        submitted: finishing,
      });

      if (!result.ok) {
        window.alert(result.error);
        return;
      }

      navigateAfterPersist(finishing ? "/done" : (nextHref ?? "/done"));
    },
  });

  useEffect(() => {
    const stored = loadStepValues(step);
    for (const [key, value] of Object.entries(stored)) {
      form.setFieldValue(key, value);
    }
  }, [step, form]);

  function readLiveValues(): StepFormValues {
    const formEl = document.getElementById(FORM_ID);
    if (!(formEl instanceof HTMLFormElement)) {
      return form.state.values;
    }
    return valuesFromFormElement(formEl, step);
  }

  return (
    <form
      id={FORM_ID}
      className="flex min-h-screen flex-col"
      action={nextHref ?? "/done"}
      method="get"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        const submitter = (event.nativeEvent as SubmitEvent)
          .submitter as HTMLButtonElement | null;
        const intent = submitter?.value;
        // Only Next / Finish submit this form. Back is a real link.
        if (intent !== "next" && intent !== "finish") {
          return;
        }

        const values = readLiveValues();
        pendingValuesRef.current = values;
        for (const [key, value] of Object.entries(values)) {
          form.setFieldValue(key, value);
        }

        void form.handleSubmit();
      }}
    >
      <Layout
        pageTitle={`${step.title} · Session Pulse`}
        phase="step"
        stepIndex={index}
        navSlot={
          <SurveyNav
            formId={FORM_ID}
            showBack
            backLabel="Back"
            backHref={backHref}
            onBack={(href) => {
              const values = readLiveValues();
              const result = persistSurveyAnswers(values);
              if (!result.ok) {
                window.alert(result.error);
                return;
              }
              navigateAfterPersist(href);
            }}
            showForward
            showFinish={isLast}
            forwardLabel="Next"
            forwardIntent="next"
          />
        }
      >
        <header className="mb-8 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Step {index + 1}
          </p>
          <h1
            id="page-heading"
            tabIndex={-1}
            className="vt-survey-title max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight"
          >
            {step.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </header>

        <div className="grid gap-4">
          {step.questions.map((question) => (
            <form.Field
              key={question.id}
              name={question.id}
              children={(field) => {
                const error = fieldErrorMessage(field.state.meta.errors);
                return (
                  <QuestionRenderer
                    question={question}
                    value={field.state.value as AnswerValue}
                    error={error}
                    transitionName={questionTransitionName(question.id)}
                    onBlur={field.handleBlur}
                    onChange={(value) => {
                      runViewTransition(() => {
                        field.handleChange(value);
                      });
                    }}
                  />
                );
              }}
            />
          ))}
        </div>
      </Layout>
    </form>
  );
}
