"use client";

import { LiveRegion } from "@/components/LiveRegion";
import { Layout } from "@/components/Layout";
import { SurveyNav } from "@/components/SurveyNav";
import { surveyMeta, stepTransitionName, surveySteps } from "@/data/survey";

const FORM_ID = "survey-welcome-form";
const START_HREF = `/steps/${surveySteps[0].slug}`;

export function WelcomePageClient() {
  return (
    <form
      id={FORM_ID}
      className="flex min-h-screen flex-col"
      action={START_HREF}
      method="get"
    >
      <Layout
        pageTitle="Session Pulse · Welcome"
        phase="welcome"
        navSlot={
          <SurveyNav
            formId={FORM_ID}
            showBack
            backDisabled
            showForward
            forwardLabel="Start"
            forwardIntent="start"
          />
        }
      >
        <section className="flex min-h-[70vh] flex-col justify-center gap-5 py-6">
          <p className="text-sm font-medium text-primary">{surveyMeta.brand}</p>
          <h1
            id="page-heading"
            tabIndex={-1}
            className="max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]"
            style={{ viewTransitionName: stepTransitionName("title") }}
          >
            How was the talk?
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            A short multi-page survey for{" "}
            <span className="font-medium text-foreground">{surveyMeta.talkTitle}</span>.
          </p>
        </section>

        <LiveRegion message="Survey welcome loaded." focusTargetId="page-heading" />
      </Layout>
    </form>
  );
}
