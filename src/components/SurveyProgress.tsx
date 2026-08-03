import { getProgressPercent } from "@/shared/survey-answers";

interface SurveyProgressProps {
  currentIndex: number;
  phase: "welcome" | "step" | "done";
}

export function SurveyProgress({ currentIndex, phase }: SurveyProgressProps) {
  const percent = getProgressPercent(phase, currentIndex);

  return (
    <div
      className="h-1.5 w-full bg-secondary"
      style={{ viewTransitionName: "survey-progress" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label={`${percent}% complete`}
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${percent}%`,
          viewTransitionName: "survey-progress-fill",
        }}
      />
    </div>
  );
}
