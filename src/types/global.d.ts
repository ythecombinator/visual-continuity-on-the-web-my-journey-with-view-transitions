export {};

type ViewTransitionTypeSet = {
  add(type: string): void;
  clear(): void;
  delete(type: string): boolean;
  has(type: string): boolean;
  forEach(
    callback: (value: string, value2: string, set: ViewTransitionTypeSet) => void,
  ): void;
  readonly size: number;
};

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
  types: ViewTransitionTypeSet;
}

interface NavigationActivation {
  entry: { url: string };
  from: { url: string } | null;
  navigationType: NavigationTypeString;
}

type NavigationTypeString = "push" | "replace" | "traverse" | "reload";

interface Navigation {
  readonly activation?: NavigationActivation | null;
  readonly currentEntry?: { url: string } | null;
}

interface PageRevealEvent extends Event {
  readonly viewTransition: ViewTransition | null;
}

interface PageSwapEvent extends Event {
  readonly viewTransition: ViewTransition | null;
  readonly activation: NavigationActivation | null;
}

declare global {
  interface Window {
    __PAGE_DATA__?: Record<string, unknown>;
    __SURVEY_PATH_ORDER__?: string[];
    navigation?: Navigation;
  }

  interface WindowEventMap {
    pagereveal: PageRevealEvent;
    pageswap: PageSwapEvent;
  }

  interface Document {
    startViewTransition(
      updateCallback?: () => void | Promise<void>,
    ): ViewTransition;
  }
}
