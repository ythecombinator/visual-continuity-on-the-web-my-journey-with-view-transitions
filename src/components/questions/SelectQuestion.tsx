import type { Question } from "@/data/survey";
import { cn } from "@/lib/utils";
import { runViewTransition } from "@/shared/view-transition";

interface SelectQuestionProps {
  question: Question;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  transitionName?: string;
}

export function SelectQuestion({
  question,
  value = "",
  error,
  onChange,
  onBlur,
  transitionName,
}: SelectQuestionProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur",
        error && "border-destructive/50 ring-2 ring-destructive/15",
      )}
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
    >
      <div className="mb-4 space-y-1.5">
        <label
          htmlFor={question.id}
          className="block text-lg font-semibold tracking-tight text-foreground"
        >
          {question.label}
        </label>
        {question.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {question.description}
          </p>
        ) : null}
      </div>

      <select
        id={question.id}
        name={question.id}
        className="flex h-11 w-full rounded-xl border border-input bg-background/80 px-3.5 text-[0.95rem] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        value={value}
        onBlur={onBlur}
        onChange={(event) => {
          const next = event.target.value;
          runViewTransition(() => onChange(next));
        }}
      >
        <option value="" disabled>
          Select an option…
        </option>
        {question.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? <p className="mt-3 text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
