import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  return (
    <QuestionShell error={error} transitionName={transitionName}>
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
        <Textarea
          id={question.id}
          name={question.id}
          placeholder={question.placeholder}
          value={value}
          aria-invalid={Boolean(error) || undefined}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <Input
          id={question.id}
          name={question.id}
          type="text"
          placeholder={question.placeholder}
          value={value}
          aria-invalid={Boolean(error) || undefined}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </QuestionShell>
  );
}
