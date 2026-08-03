"use client";

import type { Question } from "@/data/survey";
import type { AnswerValue } from "@/shared/survey-answers";
import { CheckboxQuestion } from "@/components/questions/CheckboxQuestion";
import { ComboboxQuestion } from "@/components/questions/ComboboxQuestion";
import { RadioQuestion } from "@/components/questions/RadioQuestion";
import { SelectQuestion } from "@/components/questions/SelectQuestion";
import { TextQuestion } from "@/components/questions/TextQuestion";

interface QuestionRendererProps {
  question: Question;
  value?: AnswerValue;
  error?: string;
  onChange: (value: AnswerValue) => void;
  onBlur?: () => void;
  transitionName?: string;
}

export function QuestionRenderer({
  question,
  value,
  error,
  onChange,
  onBlur,
  transitionName,
}: QuestionRendererProps) {
  switch (question.type) {
    case "radio":
      return (
        <RadioQuestion
          question={question}
          value={typeof value === "string" ? value : undefined}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
        />
      );
    case "checkbox":
      return (
        <CheckboxQuestion
          question={question}
          value={Array.isArray(value) ? value : []}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
        />
      );
    case "select":
      return (
        <SelectQuestion
          question={question}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
        />
      );
    case "combobox":
      return (
        <ComboboxQuestion
          question={question}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
        />
      );
    case "textarea":
      return (
        <TextQuestion
          question={question}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
          multiline
        />
      );
    case "text":
    default:
      return (
        <TextQuestion
          question={question}
          value={typeof value === "string" ? value : ""}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          transitionName={transitionName}
        />
      );
  }
}
