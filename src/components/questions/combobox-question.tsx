import type { Question } from "@/data/survey";
import { QuestionShell } from "@/components/questions/question-shell";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface ComboboxQuestionProps {
  question: Question;
  value?: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  transitionName?: string;
}

export function ComboboxQuestion({
  question,
  value = "",
  error,
  onChange,
  onBlur,
  transitionName,
}: ComboboxQuestionProps) {
  const options = question.options ?? [];
  const labels = options.map((option) => option.label);
  const selected =
    options.find((option) => option.label === value || option.value === value)
      ?.label ?? null;

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

      {/* Free-text answers stay in inputValue; selection syncs both. */}
      <Combobox
        items={labels}
        value={selected}
        inputValue={value}
        onInputValueChange={(next) => onChange(next)}
        onValueChange={(next) => {
          if (typeof next === "string") onChange(next);
        }}
      >
        <ComboboxInput
          id={question.id}
          name={question.id}
          placeholder={question.placeholder}
          aria-invalid={Boolean(error) || undefined}
          onBlur={onBlur}
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches. Your text will be saved.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </QuestionShell>
  );
}
