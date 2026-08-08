import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/data/survey";
import { cn } from "@/lib/utils";

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
  const listId = `${question.id}-list`;
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const options = question.options ?? [];
    if (!normalized) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(normalized) ||
        option.value.toLowerCase().includes(normalized),
    );
  }, [question.options, query]);

  const commit = (next: string) => {
    setQuery(next);
    onChange(next);
    setOpen(false);
  };

  return (
    <div
      className={cn(
        "vt-survey-question rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur",
        open && "relative z-50",
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

      <div className="relative">
        <input
          id={question.id}
          name={question.id}
          className="flex h-11 w-full rounded-xl border border-input bg-background/80 px-3.5 text-[0.95rem] shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          placeholder={question.placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            const next = event.target.value;
            setQuery(next);
            onChange(next);
            setOpen(true);
          }}
          onBlur={() => {
            onBlur?.();
            window.setTimeout(() => setOpen(false), 120);
          }}
        />
        {open ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-full z-50 mt-2 max-h-56 overflow-auto rounded-xl border border-border bg-popover p-1 shadow-lg"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">
                No matches. Your text will be saved.
              </li>
            ) : (
              filtered.map((option) => (
                <li key={option.value} role="option">
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary hover:text-secondary-foreground"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commit(option.label)}
                  >
                    {option.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>

      {error ? <p className="mt-3 text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
