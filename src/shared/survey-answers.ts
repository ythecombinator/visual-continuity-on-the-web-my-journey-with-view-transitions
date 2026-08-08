import { surveySteps, type Question } from "@/data/survey";

export type AnswerValue = string | string[];

export type SurveyAnswers = Record<string, AnswerValue>;

export interface SurveyState {
  answers: SurveyAnswers;
  submitted: boolean;
}

export const DEFAULT_SURVEY_STATE: SurveyState = {
  answers: {},
  submitted: false,
};

export const SURVEY_STORAGE_KEY = "session-pulse-survey";

export function parseSurveyState(raw: string | null | undefined): SurveyState {
  if (!raw) return { ...DEFAULT_SURVEY_STATE, answers: {} };
  try {
    const parsed = JSON.parse(raw) as Partial<SurveyState>;
    return {
      answers: parsed.answers ?? {},
      submitted: Boolean(parsed.submitted),
    };
  } catch {
    return { ...DEFAULT_SURVEY_STATE, answers: {} };
  }
}

export function isAnswered(question: Question, value: AnswerValue | undefined): boolean {
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  return value.trim().length > 0;
}

export function getAnswerLabel(
  question: Question,
  value: AnswerValue | undefined,
): string {
  if (value == null || (Array.isArray(value) && value.length === 0)) {
    return "None";
  }

  if (question.type === "checkbox" && Array.isArray(value)) {
    return value
      .map(
        (item) =>
          question.options?.find((option) => option.value === item)?.label ?? item,
      )
      .join(", ");
  }

  const raw = Array.isArray(value) ? value[0] : value;
  return (
    question.options?.find((option) => option.value === raw)?.label ?? raw
  );
}

export function collectAnsweredQuestions(answers: SurveyAnswers) {
  return surveySteps.flatMap((step) =>
    step.questions
      .filter((question) => isAnswered(question, answers[question.id]))
      .map((question) => ({
        stepTitle: step.title,
        question,
        display: getAnswerLabel(question, answers[question.id]),
      })),
  );
}

export function getProgressPercent(phase: "welcome" | "step" | "done", stepIndex: number) {
  const total = surveySteps.length;
  if (phase === "done") return 100;
  if (phase === "welcome") return 0;
  return Math.round(((stepIndex + 1) / (total + 1)) * 100);
}
