import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuestionShellProps {
  error?: string;
  transitionName?: string;
  as?: "div" | "fieldset";
  labelledBy?: string;
  children: ReactNode;
}

export function QuestionShell({
  error,
  transitionName,
  as = "div",
  labelledBy,
  children,
}: QuestionShellProps) {
  const className = cn(
    "vt-survey-question rounded-2xl border border-border/80 bg-card p-5 shadow-sm backdrop-blur",
    error && "border-destructive/50 ring-2 ring-destructive/15",
  );
  const style = transitionName
    ? ({ viewTransitionName: transitionName } as const)
    : undefined;

  if (as === "fieldset") {
    return (
      <fieldset className={className} style={style} aria-labelledby={labelledBy}>
        {children}
        {error ? (
          <p className="mt-3 text-sm font-medium text-destructive">{error}</p>
        ) : null}
      </fieldset>
    );
  }

  return (
    <div className={className} style={style}>
      {children}
      {error ? (
        <p className="mt-3 text-sm font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
