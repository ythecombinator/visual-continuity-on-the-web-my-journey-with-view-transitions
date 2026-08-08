import type { SurveyStep } from "@/data/survey";
import type { StepFormValues } from "@/shared/survey-schema";
import { emptyStepValues } from "@/shared/survey-storage";

/** Read the live DOM form (source of truth at submit time). */
export function valuesFromFormElement(
  form: HTMLFormElement,
  step: SurveyStep,
): StepFormValues {
  const data = new FormData(form);
  const values = emptyStepValues(step);

  for (const question of step.questions) {
    if (question.type === "checkbox") {
      values[question.id] = data.getAll(question.id).map(String);
    } else {
      const raw = data.get(question.id);
      values[question.id] = raw == null ? "" : String(raw);
    }
  }

  return values;
}
