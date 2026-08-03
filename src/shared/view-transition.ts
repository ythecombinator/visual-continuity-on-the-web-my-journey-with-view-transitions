export function viewTransitionSupported(): boolean {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !document.documentElement.classList.contains("force-reduced-motion")
  );
}

export function runViewTransition(update: () => void | Promise<void>): void {
  if (!viewTransitionSupported()) {
    void Promise.resolve(update());
    return;
  }

  document.startViewTransition(async () => {
    await update();
  });
}

export function getNavigationDebugInfo(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const nav = window.navigation;
  if (!nav?.activation) return { supported: false };
  return {
    supported: true,
    navigationType: nav.activation.navigationType,
    entry: nav.currentEntry?.url ?? window.location.href,
  };
}
