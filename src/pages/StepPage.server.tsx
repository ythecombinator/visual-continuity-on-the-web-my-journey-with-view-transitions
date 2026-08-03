import { StepPageClient } from "@/pages/StepPage";
import type { SurveyStep } from "@/data/survey";

interface StepPageProps {
  step: SurveyStep;
}

export function StepPage({ step }: StepPageProps) {
  return <StepPageClient step={step} />;
}
