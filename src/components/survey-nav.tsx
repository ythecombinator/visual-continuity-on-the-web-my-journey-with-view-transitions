import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SurveyNavIntent = "back" | "next" | "start" | "finish" | "restart";

interface SurveyNavProps {
  /** When set, buttons submit this form via the form attribute. */
  formId?: string;
  showBack?: boolean;
  backDisabled?: boolean;
  backLabel?: string;
  backIntent?: Extract<SurveyNavIntent, "back" | "restart">;
  /** Real link — preferred for cross-document view transitions when no persist/validate is needed. */
  backHref?: string;
  showForward?: boolean;
  forwardLabel?: string;
  forwardIntent?: Extract<SurveyNavIntent, "next" | "start" | "finish" | "restart">;
  /** Real link — preferred for Start and other non-validated navigations. */
  forwardHref?: string;
  showFinish?: boolean;
}

export function SurveyNav({
  formId,
  showBack = true,
  backDisabled = false,
  backLabel = "Back",
  backIntent = "back",
  backHref,
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
          >
            <ArrowLeft />
            {backLabel}
          </a>
        ) : (
          <button
            type="submit"
            form={formId}
            name="intent"
            value={backIntent}
            className={cn(buttonVariants({ variant: "outline" }), "min-w-28")}
          >
            <ArrowLeft />
            {backLabel}
          </button>
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
