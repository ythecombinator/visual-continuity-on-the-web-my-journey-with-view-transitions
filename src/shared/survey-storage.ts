import type { SurveyStep } from "@/data/survey";
import type { AnswerValue, SurveyAnswers, SurveyState } from "@/shared/survey-answers";
import {
  DEFAULT_SURVEY_STATE,
  SURVEY_STORAGE_KEY,
  parseSurveyState,
} from "@/shared/survey-answers";
import { navigateForViewTransition } from "@/shared/view-transition";

export type PersistResult =
  | { ok: true; state: SurveyState }
  | { ok: false; error: string };

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readSurveyState(): SurveyState {
  if (!canUseStorage()) {
    return { answers: {}, submitted: false };
  }
  try {
    return parseSurveyState(window.localStorage.getItem(SURVEY_STORAGE_KEY));
  } catch {
    return { ...DEFAULT_SURVEY_STATE, answers: {} };
  }
}

/** Synchronously merge answers into localStorage and verify the write. */
export function persistSurveyAnswers(
  answers: SurveyAnswers,
  options?: { submitted?: boolean },
): PersistResult {
  if (!canUseStorage()) {
    return { ok: false, error: "localStorage is not available in this browser." };
  }

  try {
    const current = readSurveyState();
    const next: SurveyState = {
      answers: { ...current.answers, ...answers },
      submitted:
        options?.submitted !== undefined
          ? Boolean(options.submitted)
          : current.submitted,
    };
    const serialized = JSON.stringify(next);
    window.localStorage.setItem(SURVEY_STORAGE_KEY, serialized);

    const verified = window.localStorage.getItem(SURVEY_STORAGE_KEY);
    if (verified !== serialized) {
      return {
        ok: false,
        error: "Save verification failed. Answers were not written to localStorage.",
      };
    }

    return { ok: true, state: next };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown localStorage error";
    return { ok: false, error: `Could not save answers: ${message}` };
  }
}

export function clearSurveyState(): PersistResult {
  if (!canUseStorage()) {
    return { ok: false, error: "localStorage is not available in this browser." };
  }
  try {
    window.localStorage.removeItem(SURVEY_STORAGE_KEY);
    return { ok: true, state: { answers: {}, submitted: false } };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown localStorage error";
    return { ok: false, error: `Could not clear answers: ${message}` };
  }
}

export function emptyStepValues(step: SurveyStep): Record<string, AnswerValue> {
  const values: Record<string, AnswerValue> = {};
  for (const question of step.questions) {
    values[question.id] = question.type === "checkbox" ? [] : "";
  }
  return values;
}

export function loadStepValues(step: SurveyStep): Record<string, AnswerValue> {
  const stored = readSurveyState().answers;
  const values = emptyStepValues(step);
  for (const question of step.questions) {
    const existing = stored[question.id];
    if (existing === undefined) continue;
    if (question.type === "checkbox") {
      values[question.id] = Array.isArray(existing) ? existing : [];
    } else {
      values[question.id] = typeof existing === "string" ? existing : "";
    }
  }
  return values;
}

export function navigateAfterPersist(href: string): void {
  // Must stay synchronous inside the user gesture so cross-document VT fires.
  navigateForViewTransition(href);
}
