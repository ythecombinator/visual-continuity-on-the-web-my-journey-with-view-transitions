import { CheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxQuestionProps {
  question: Question;
  value?: string[];
  error?: string;
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  transitionName?: string;
}

export function CheckboxQuestion({
  question,
  value = [],
  error,
  onChange,
  onBlur,
  transitionName,
}: CheckboxQuestionProps) {
  const titleId = `${question.id}-title`;

  return (
    <QuestionShell
      as="fieldset"
      labelledBy={titleId}
      error={error}
      transitionName={transitionName}
    >
      <div className="mb-4 space-y-1.5">
        <p
          id={titleId}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {question.label}
        </p>
        {question.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question.description}
          </p>
        ) : null}
      </div>

      <CheckboxGroup
        value={value}
        aria-invalid={Boolean(error) || undefined}
        className="grid gap-2"
        onValueChange={onChange}
        onBlur={onBlur}
      >
        {question.options?.map((option) => {
          const selected = value.includes(option.value);
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
              <Checkbox id={id} name={question.id} value={option.value} />
              <span className="text-base leading-snug">{option.label}</span>
            </label>
          );
        })}
      </CheckboxGroup>
    </QuestionShell>
  );
}
