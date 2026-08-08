import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SurveyNavIntent = "next" | "start" | "finish" | "restart";

interface SurveyNavProps {
  formId?: string;
  showBack?: boolean;
  backDisabled?: boolean;
  backLabel?: string;
  /** Real previous-step URL. Prefer this over a submit button so Back never follows the form action. */
  backHref?: string;
  /** Called instead of following the link when you need to persist first. */
  onBack?: (href: string) => void;
  showForward?: boolean;
  forwardLabel?: string;
  forwardIntent?: Extract<SurveyNavIntent, "next" | "start" | "finish" | "restart">;
  forwardHref?: string;
  showFinish?: boolean;
}

export function SurveyNav({
  formId,
  showBack = true,
  backDisabled = false,
  backLabel = "Back",
  backHref,
  onBack,
  showForward = true,
  forwardLabel = "Next",
  forwardIntent = "next",
  forwardHref,
  showFinish = false,
}: SurveyNavProps) {
  const forwardValue = showFinish ? "finish" : forwardIntent;
  const forwardText = showFinish ? "Finish" : forwardLabel;

  return (
    <nav
      className="vt-survey-nav flex w-full flex-wrap items-center justify-between gap-2"
      aria-label="Survey"
    >
      {showBack ? (
        backDisabled ? (
          <Button variant="outline" className="min-w-28" disabled type="button">
            <ArrowLeft />
            {backLabel}
          </Button>
        ) : backHref ? (
          <a
            href={backHref}
            className={cn(buttonVariants({ variant: "outline" }), "min-w-28")}
            onClick={(event) => {
              if (!onBack) return;
              event.preventDefault();
              onBack(backHref);
            }}
          >
            <ArrowLeft />
            {backLabel}
          </a>
        ) : (
          <Button variant="outline" className="min-w-28" disabled type="button">
            <ArrowLeft />
            {backLabel}
          </Button>
        )
      ) : (
        <span />
      )}

      {showForward ? (
        forwardHref && !showFinish ? (
          <a href={forwardHref} className={cn(buttonVariants(), "min-w-28")}>
            {forwardText}
            <ArrowRight />
          </a>
        ) : (
          <button
            type="submit"
            form={formId}
            name="intent"
            value={forwardValue}
            className={cn(buttonVariants(), "min-w-28")}
          >
            {forwardText}
            {showFinish || forwardValue === "finish" ? <Check /> : <ArrowRight />}
          </button>
        )
      ) : (
        <span />
      )}
    </nav>
  );
}
