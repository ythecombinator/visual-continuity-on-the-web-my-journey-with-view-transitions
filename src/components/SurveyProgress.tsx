import { getProgressPercent } from "@/shared/survey-answers";

interface SurveyProgressProps {
  currentIndex: number;
  phase: "welcome" | "step" | "done";
}

export function SurveyProgress({ currentIndex, phase }: SurveyProgressProps) {
  const percent = getProgressPercent(phase, currentIndex);

  return (
    <div
      className="vt-survey-progress h-1.5 w-full bg-secondary"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={`${percent}% complete`}
    >
      <div
        className="vt-survey-progress-fill h-full bg-primary"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
