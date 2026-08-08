import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import { QuestionTitle } from "@/components/questions/question-title";
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
        <QuestionTitle htmlFor={question.id} required={question.required}>
          {question.label}
        </QuestionTitle>
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
          required={question.required}
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
          required={question.required}
          aria-invalid={Boolean(error) || undefined}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </QuestionShell>
  );
}
