import type { ReactNode } from "react";
import { SurveyProgress } from "@/components/survey-progress";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
  phase: "welcome" | "step" | "done";
  stepIndex?: number;
  navSlot: ReactNode;
}

export function Layout({
  children,
  pageTitle,
  phase,
  stepIndex = -1,
  navSlot,
}: LayoutProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-40">
        <SurveyProgress currentIndex={stepIndex} phase={phase} />
      </div>

      <main
        className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 pb-28 sm:px-6 sm:py-10"
        id="main-content"
      >
        <h1 className="sr-only">{pageTitle}</h1>
        {children}
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-3xl px-4 py-3 sm:px-6">
          {navSlot}
        </div>
      </footer>
    </div>
  );
}
