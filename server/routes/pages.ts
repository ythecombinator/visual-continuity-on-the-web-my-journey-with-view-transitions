import type { FastifyInstance } from "fastify";
import type { ComponentType } from "react";
import { getStepBySlug } from "../../src/data/survey.js";
import { renderPage } from "../../src/server/render.js";
import { WelcomePage } from "../../src/pages/WelcomePage.server.js";
import { StepPage } from "../../src/pages/StepPage.server.js";
import { DonePage } from "../../src/pages/DonePage.server.js";

interface PageRouteContext {
  dev: boolean;
  cssHrefs: string[];
  getClientScripts: (entry: string, pageData?: Record<string, unknown>) => string;
}

export async function registerPageRoutes(
  app: FastifyInstance,
  ctx: PageRouteContext,
) {
  app.get("/", async (_request, reply) => {
    const html = renderPage({
      title: "Session Pulse · View Transitions demo",
      component: WelcomePage as unknown as ComponentType<Record<string, unknown>>,
      props: {},
      clientEntry: "/src/client/welcome.tsx",
      dev: ctx.dev,
      cssHrefs: ctx.cssHrefs,
      scriptTags: ctx.getClientScripts("welcome"),
    });

    return reply.type("text/html").send(html);
  });

  app.get<{ Params: { slug: string } }>(
    "/steps/:slug",
    async (request, reply) => {
      const step = getStepBySlug(request.params.slug);

      if (!step) {
        return reply.code(404).type("text/html").send("<h1>Step not found</h1>");
      }

      const pageData = { step };

      const html = renderPage({
        title: `${step.title} · Session Pulse`,
        component: StepPage as unknown as ComponentType<Record<string, unknown>>,
        props: { step },
        clientEntry: "/src/client/step.tsx",
        dev: ctx.dev,
        cssHrefs: ctx.cssHrefs,
        scriptTags: ctx.getClientScripts("step", pageData),
      });

      return reply.type("text/html").send(html);
    },
  );

  app.get("/done", async (_request, reply) => {
    const html = renderPage({
      title: "Thanks · Session Pulse",
      component: DonePage as unknown as ComponentType<Record<string, unknown>>,
      props: {},
      clientEntry: "/src/client/done.tsx",
      dev: ctx.dev,
      cssHrefs: ctx.cssHrefs,
      scriptTags: ctx.getClientScripts("done"),
    });

    return reply.type("text/html").send(html);
  });
}
