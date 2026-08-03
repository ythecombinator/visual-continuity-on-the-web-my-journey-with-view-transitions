"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SurveyNavIntent = "back" | "next" | "start" | "finish" | "restart";

interface SurveyNavProps {
  /** When set, buttons submit this form via the form attribute. */
  formId: string;
  showBack?: boolean;
  backDisabled?: boolean;
  backLabel?: string;
  backIntent?: Extract<SurveyNavIntent, "back" | "restart">;
  showForward?: boolean;
  forwardLabel?: string;
  forwardIntent?: Extract<SurveyNavIntent, "next" | "start" | "finish" | "restart">;
  showFinish?: boolean;
}

export function SurveyNav({
  formId,
  showBack = true,
  backDisabled = false,
  backLabel = "Back",
  backIntent = "back",
  showForward = true,
  forwardLabel = "Next",
  forwardIntent = "next",
  showFinish = false,
}: SurveyNavProps) {
  const forwardValue = showFinish ? "finish" : forwardIntent;
  const forwardText = showFinish ? "Finish" : forwardLabel;

  return (
    <nav
      className="flex w-full flex-wrap items-center justify-between gap-2"
      style={{ viewTransitionName: "survey-nav" }}
      aria-label="Survey"
    >
      {showBack ? (
        backDisabled ? (
          <Button variant="outline" className="min-w-28" disabled type="button">
            <ArrowLeft />
            {backLabel}
          </Button>
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
      ) : (
        <span />
      )}
    </nav>
  );
}
