import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuestionTitleProps {
  id?: string;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function QuestionTitle({
  id,
  htmlFor,
  required,
  children,
  className,
}: QuestionTitleProps) {
  const classes = cn(
    "text-lg font-semibold tracking-tight text-foreground",
    className,
  );

  const content = (
    <>
      {children}
      {required ? (
        <span className="ml-1 text-primary" aria-hidden="true">
          *
        </span>
      ) : null}
    </>
  );

  if (htmlFor) {
    return (
      <label id={id} htmlFor={htmlFor} className={cn(classes, "block")}>
        {content}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
    );
  }

  return (
    <p id={id} className={classes}>
      {content}
      {required ? <span className="sr-only"> (required)</span> : null}
    </p>
  );
}
