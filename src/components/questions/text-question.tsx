import type { Question } from "@/data/survey";
import { cn } from "@/lib/utils";

interface TextQuestionProps {
  question: Question;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  transitionName?: string;
  multiline?: boolean;
}

export function TextQuestion({
  question,
  value = "",
  error,
  onChange,
  onBlur,
  transitionName,
  multiline = false,
}: TextQuestionProps) {
  const fieldClass =
    "w-full rounded-xl border border-input bg-background/80 px-3.5 py-2.5 text-[0.95rem] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div
      className={cn(
        "vt-survey-question rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur",
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

      {multiline ? (
        <textarea
          id={question.id}
          name={question.id}
          className={cn(fieldClass, "min-h-28 resize-y leading-relaxed")}
          placeholder={question.placeholder}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={question.id}
          name={question.id}
          type="text"
          className={cn(fieldClass, "h-11")}
          placeholder={question.placeholder}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {error ? <p className="mt-3 text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
