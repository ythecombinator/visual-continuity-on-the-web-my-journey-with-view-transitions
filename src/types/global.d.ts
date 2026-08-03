export {};

declare global {
  interface Window {
    __PAGE_DATA__?: Record<string, unknown>;
    navigation?: Navigation;
  }
}
