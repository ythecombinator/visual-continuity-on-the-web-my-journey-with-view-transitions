import type { FastifyInstance } from "fastify";
import {
  DEFAULT_DEMO_CONFIG,
  DEMO_CONFIG_COOKIE,
  serializeDemoConfig,
  type DemoConfig,
} from "../../src/shared/demo-config.js";
import {
  getDemoConfigFromRequest,
  setDemoConfigCookie,
} from "../demo-config.js";

export async function registerApiRoutes(app: FastifyInstance) {
  app.get("/api/demo/config", async (request) => {
    return getDemoConfigFromRequest(request);
  });

  app.post<{ Body: Partial<DemoConfig> }>(
    "/api/demo/config",
    async (request, reply) => {
      const current = getDemoConfigFromRequest(request);
      const next: DemoConfig = { ...current, ...request.body };

      reply.setCookie(DEMO_CONFIG_COOKIE, setDemoConfigCookie(next), {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      return next;
    },
  );

  app.delete("/api/demo/config", async (_request, reply) => {
    reply.clearCookie(DEMO_CONFIG_COOKIE, { path: "/" });
    return DEFAULT_DEMO_CONFIG;
  });
}
