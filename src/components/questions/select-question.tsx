import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import { QuestionTitle } from "@/components/questions/question-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const options = question.options ?? [];
  const items = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

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

      <Select
        name={question.id}
        value={value || null}
        items={items}
        required={question.required}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
      >
        <SelectTrigger
          id={question.id}
          aria-invalid={Boolean(error) || undefined}
          onBlur={onBlur}
        >
          <SelectValue placeholder="Select an option…" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </QuestionShell>
  );
}
