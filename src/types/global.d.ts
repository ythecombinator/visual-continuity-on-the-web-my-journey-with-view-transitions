import type { DemoConfig } from "@/shared/demo-config";

export {};

declare global {
  interface Window {
    __DEMO_CONFIG__?: DemoConfig;
    __PAGE_DATA__?: Record<string, unknown>;
    navigation?: Navigation;
  }
}
