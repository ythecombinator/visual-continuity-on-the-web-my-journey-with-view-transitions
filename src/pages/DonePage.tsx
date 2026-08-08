import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { SurveyNav } from "@/components/SurveyNav";
import { Button, buttonVariants } from "@/components/ui/button";
import { surveySteps } from "@/data/survey";
import { cn } from "@/lib/utils";
import {
  collectAnsweredQuestions,
  type SurveyAnswers,
} from "@/shared/survey-answers";
import {
  clearSurveyState,
  navigateAfterPersist,
  persistSurveyAnswers,
  readSurveyState,
} from "@/shared/survey-storage";
import { runViewTransition } from "@/shared/view-transition";

const FORM_ID = "survey-done-form";

export function DonePage() {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(true);
  const summary = collectAnsweredQuestions(answers);
  const lastStep = surveySteps[surveySteps.length - 1];

  useEffect(() => {
    const stored = readSurveyState();
    setAnswers(stored.answers);
    setSubmitted(stored.submitted);
    if (!stored.submitted && Object.keys(stored.answers).length > 0) {
      const result = persistSurveyAnswers(stored.answers, { submitted: true });
      if (result.ok) setSubmitted(true);
    }
  }, []);

  const lastStepHref = `/steps/${lastStep.slug}`;

  return (
    <form
      id={FORM_ID}
      className="flex min-h-screen flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        const submitter = (event.nativeEvent as SubmitEvent)
          .submitter as HTMLButtonElement | null;
        const intent = submitter?.value ?? "restart";

        if (intent === "restart") {
          const cleared = clearSurveyState();
          if (!cleared.ok) {
            window.alert(cleared.error);
            return;
          }
          navigateAfterPersist("/");
        }
      }}
    >
      <Layout
        pageTitle="Session Pulse · Done"
        phase="done"
        stepIndex={surveySteps.length - 1}
        navSlot={
          <SurveyNav
            formId={FORM_ID}
            showBack
            backLabel="Back"
            backHref={lastStepHref}
            showForward
            forwardLabel="Start over"
            forwardIntent="restart"
          />
        }
      >
        <section className="space-y-5 py-4">
          <div className="space-y-3">
            <p className="text-sm font-medium text-primary">
              {submitted ? "Submitted" : "Almost there"}
            </p>
            <h1
              id="page-heading"
              tabIndex={-1}
              className="vt-survey-title max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]"
            >
              Thanks for the signal
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Your answers stayed in localStorage across hard MPA documents.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={lastStepHref}
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Back to last step
            </a>
            <button
              type="submit"
              form={FORM_ID}
              name="intent"
              value="restart"
              className={cn(buttonVariants())}
            >
              Start over
            </button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                runViewTransition(() => setRevealed((value) => !value))
              }
            >
              {revealed ? "Hide summary" : "Show summary"}
            </Button>
          </div>
        </section>

        {revealed ? (
          <section
            className="mt-8 rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur"
            aria-label="Answer summary"
          >
            <h2 className="mb-4 text-lg font-semibold tracking-tight">
              What you shared
            </h2>
            {summary.length === 0 ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                No answers yet — head back a step.
              </p>
            ) : (
              <dl className="space-y-4">
                {summary.map(({ question, display, stepTitle }) => (
                  <div
                    key={question.id}
                    className="border-t border-border/70 pt-4 first:border-0 first:pt-0"
                  >
                    <dt className="space-y-1">
                      <span className="block text-sm text-muted-foreground">
                        {stepTitle}
                      </span>
                      <span className="text-base font-semibold text-foreground">
                        {question.label}
                      </span>
                    </dt>
                    <dd className="mt-1 text-base leading-relaxed text-muted-foreground">
                      {display}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ) : null}
      </Layout>
    </form>
  );
}
