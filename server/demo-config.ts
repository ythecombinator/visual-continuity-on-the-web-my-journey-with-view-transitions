import type { FastifyRequest } from "fastify";
import {
  DEFAULT_DEMO_CONFIG,
  DEMO_CONFIG_COOKIE,
  parseDemoConfig,
  serializeDemoConfig,
  type DemoConfig,
} from "../src/shared/demo-config.js";

export function getDemoConfigFromRequest(request: FastifyRequest): DemoConfig {
  const cookie = request.cookies[DEMO_CONFIG_COOKIE];
  return parseDemoConfig(cookie);
}

export function setDemoConfigCookie(config: DemoConfig): string {
  return serializeDemoConfig(config);
}

export { DEFAULT_DEMO_CONFIG, DEMO_CONFIG_COOKIE, type DemoConfig };
