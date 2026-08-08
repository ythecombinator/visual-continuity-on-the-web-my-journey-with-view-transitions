import { surveySteps } from "@/data/survey";

export type CrossDocumentTransitionType =
  | "forwards"
  | "backwards"
  | "finish"
  | "reload";

/** Canonical route order for directional / finish transition types. */
export function surveyPathOrder(): string[] {
  return ["/", ...surveySteps.map((step) => `/steps/${step.slug}`), "/done"];
}

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function pathRank(pathname: string, order = surveyPathOrder()): number {
  return order.indexOf(normalizePathname(pathname));
}

export function determineTransitionType(
  fromUrl: string,
  toUrl: string,
  origin = typeof location !== "undefined" ? location.origin : "http://localhost",
): CrossDocumentTransitionType {
  const fromPath = normalizePathname(new URL(fromUrl, origin).pathname);
  const toPath = normalizePathname(new URL(toUrl, origin).pathname);
  const order = surveyPathOrder();
  const from = pathRank(fromPath, order);
  const to = pathRank(toPath, order);

  if (from < 0 || to < 0) return "forwards";
  if (from === to) return "reload";

  const doneRank = order.length - 1;
  if (to === doneRank && to > from) return "finish";
  return to > from ? "forwards" : "backwards";
}

export function viewTransitionSupported(): boolean {
  return (
    typeof document !== "undefined" &&
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
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

/**
 * Navigate with a real link activation so cross-document view transitions
 * still fire. `location.assign` is treated as script navigation and skips them.
 */
export function navigateForViewTransition(href: string): void {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) {
    window.location.assign(url.href);
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = url.pathname + url.search + url.hash;
  anchor.setAttribute("data-vt-nav", "1");
  // Keep it in-flow for a11y/hit-testing quirks, but invisible.
  anchor.setAttribute("aria-hidden", "true");
  anchor.tabIndex = -1;
  Object.assign(anchor.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: "1px",
    height: "1px",
    opacity: "0",
    pointerEvents: "none",
  });
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
