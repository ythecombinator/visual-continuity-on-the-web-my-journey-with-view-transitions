import type { Question } from "@/data/survey";
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

  const toggle = (optionValue: string, checked: boolean) => {
    if (checked) onChange([...value, optionValue]);
    else onChange(value.filter((item) => item !== optionValue));
  };

  return (
    <fieldset
      className={cn(
        "vt-survey-question rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur",
        error && "border-destructive/50 ring-2 ring-destructive/15",
      )}
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
      aria-labelledby={titleId}
    >
      <div className="mb-4 space-y-1.5">
        <p id={titleId} className="text-lg font-semibold tracking-tight text-foreground">
          {question.label}
        </p>
        {question.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question.description}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
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
              <input
                id={id}
                type="checkbox"
                name={question.id}
                value={option.value}
                checked={selected}
                className="mt-1 size-4 accent-[var(--color-primary)]"
                onBlur={onBlur}
                onChange={(event) => toggle(option.value, event.target.checked)}
              />
              <span className="text-[0.95rem] leading-snug">{option.label}</span>
            </label>
          );
        })}
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-destructive">{error}</p> : null}
    </fieldset>
  );
}
