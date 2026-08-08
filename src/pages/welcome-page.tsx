import { Layout } from "@/components/layout";
import { SurveyNav } from "@/components/survey-nav";
import { surveyMeta, surveySteps } from "@/data/survey";

const START_HREF = `/steps/${surveySteps[0].slug}`;

export function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Layout
        pageTitle="Session Pulse · Welcome"
        phase="welcome"
        navSlot={
          <SurveyNav
            showBack
            backDisabled
            showForward
            forwardLabel="Start"
            forwardHref={START_HREF}
          />
        }
      >
        <section className="flex min-h-[70vh] flex-col justify-center gap-5 py-6">
          <p className="text-sm font-medium text-primary">{surveyMeta.brand}</p>
          <h1
            id="page-heading"
            tabIndex={-1}
            className="vt-survey-title max-w-xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]"
          >
            How was the talk?
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            A short multi-page survey for{" "}
            <span className="font-medium text-foreground">{surveyMeta.talkTitle}</span>.
          </p>
        </section>
      </Layout>
    </div>
  );
}
