export interface DemoConfig {
  slowData: boolean;
  slowImageDecode: boolean;
  staleSharedName: boolean;
  disableCrossDocumentVT: boolean;
  forceReducedMotion: boolean;
  showVtDebug: boolean;
}

export const DEFAULT_DEMO_CONFIG: DemoConfig = {
  slowData: false,
  slowImageDecode: false,
  staleSharedName: false,
  disableCrossDocumentVT: false,
  forceReducedMotion: false,
  showVtDebug: false,
};

export const DEMO_CONFIG_COOKIE = "demo-config";

export function parseDemoConfig(raw: string | undefined): DemoConfig {
  if (!raw) return { ...DEFAULT_DEMO_CONFIG };
  try {
    const parsed = JSON.parse(raw) as Partial<DemoConfig>;
    return { ...DEFAULT_DEMO_CONFIG, ...parsed };
  } catch {
    return { ...DEFAULT_DEMO_CONFIG };
  }
}

export function serializeDemoConfig(config: DemoConfig): string {
  return JSON.stringify(config);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const SLOW_DATA_DELAY_MS = 2000;
