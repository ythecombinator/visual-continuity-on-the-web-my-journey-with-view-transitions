import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import { QuestionTitle } from "@/components/questions/question-title";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioQuestionProps {
  question: Question;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  transitionName?: string;
}

export function RadioQuestion({
  question,
  value = "",
  error,
  onChange,
  onBlur,
  transitionName,
}: RadioQuestionProps) {
  const titleId = `${question.id}-title`;

  return (
    <QuestionShell
      as="fieldset"
      labelledBy={titleId}
      error={error}
      transitionName={transitionName}
    >
      <div className="mb-4 space-y-1.5">
        <QuestionTitle id={titleId} required={question.required}>
          {question.label}
        </QuestionTitle>
        {question.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question.description}
          </p>
        ) : null}
      </div>

      <RadioGroup
        name={question.id}
        value={value || undefined}
        required={question.required}
        aria-invalid={Boolean(error) || undefined}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
        onBlur={onBlur}
      >
        {question.options?.map((option) => {
          const selected = value === option.value;
          const id = `${question.id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors",
                selected
                  ? "border-primary bg-secondary text-secondary-foreground"
                  : "border-border/80 bg-background/60 hover:border-primary/40 hover:bg-secondary/50",
              )}
            >
              <RadioGroupItem id={id} value={option.value} />
              <span className="text-base leading-snug">{option.label}</span>
            </label>
          );
        })}
      </RadioGroup>
    </QuestionShell>
  );
}
