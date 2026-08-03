import { z } from "zod";
import type { Question, SurveyStep } from "@/data/survey";

function questionSchema(question: Question) {
  if (question.type === "checkbox") {
    const base = z.array(z.string());
    return question.required
      ? base.min(1, "Pick at least one option.")
      : base.default([]);
  }

  const base = z.string();
  return question.required
    ? base.min(1, "This question needs an answer before you continue.")
    : base.optional().default("");
}

export function buildStepSchema(step: SurveyStep) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const question of step.questions) {
    shape[question.id] = questionSchema(question);
  }
  return z.object(shape);
}

export type StepFormValues = Record<string, string | string[]>;
