import type { FastifyInstance } from "fastify";
import type { ComponentType } from "react";
import {
  categories,
  getProductById,
  getProductsByCategory,
  products,
  type Category,
} from "../../src/data/products.js";
import { renderPage } from "../../src/server/render.js";
import { HomePage } from "../../src/pages/HomePage.server.js";
import { ProductDetailPage } from "../../src/pages/ProductDetailPage.server.js";
import { CategoryPage } from "../../src/pages/CategoryPage.server.js";
import {
  delay,
  SLOW_DATA_DELAY_MS,
} from "../../src/shared/demo-config.js";
import {
  getDemoConfigFromRequest,
  type DemoConfig,
} from "../demo-config.js";

interface PageRouteContext {
  dev: boolean;
  cssHrefs: string[];
  getClientScripts: (entry: string, pageData?: Record<string, unknown>) => string;
}

function isCategory(value: string): value is Category {
  return categories.some((category) => category.slug === value);
}

export async function registerPageRoutes(
  app: FastifyInstance,
  ctx: PageRouteContext,
) {
  app.get("/", async (request, reply) => {
    const demoConfig = getDemoConfigFromRequest(request);

    const html = renderPage({
      title: "Product catalog · Visual Continuity MPA Demo",
      component: HomePage as unknown as ComponentType<Record<string, unknown>>,
      props: { products, demoConfig },
      clientEntry: "/src/client/home.tsx",
      demoConfig,
      dev: ctx.dev,
      cssHrefs: ctx.cssHrefs,
      scriptTags: ctx.getClientScripts("home"),
    });

    return reply.type("text/html").send(html);
  });

  app.get<{ Params: { id: string } }>("/products/:id", async (request, reply) => {
    const demoConfig = getDemoConfigFromRequest(request);
    const product = getProductById(request.params.id);

    if (!product) {
      return reply.code(404).type("text/html").send("<h1>Product not found</h1>");
    }

    if (demoConfig.slowData) {
      await delay(SLOW_DATA_DELAY_MS);
    }

    const referer = request.headers.referer ?? "";
    const backHref = referer.includes("/categories/")
      ? `/categories/${product.category}`
      : "/";

    const pageData = { product, backHref };

    const html = renderPage({
      title: `${product.title} · Visual Continuity MPA Demo`,
      component: ProductDetailPage as unknown as ComponentType<Record<string, unknown>>,
      props: { product, demoConfig, backHref },
      clientEntry: "/src/client/product-detail.tsx",
      demoConfig,
      dev: ctx.dev,
      cssHrefs: ctx.cssHrefs,
      scriptTags: ctx.getClientScripts("product-detail", pageData),
    });

    return reply.type("text/html").send(html);
  });

  app.get<{ Params: { slug: string } }>(
    "/categories/:slug",
    async (request, reply) => {
      const demoConfig = getDemoConfigFromRequest(request);
      const slug = request.params.slug;

      if (!isCategory(slug)) {
        return reply.code(404).type("text/html").send("<h1>Category not found</h1>");
      }

      const categoryProducts = getProductsByCategory(slug);
      const categoryLabel =
        categories.find((category) => category.slug === slug)?.label ?? slug;
      const pageData = {
        products: categoryProducts,
        category: slug,
        categoryLabel,
      };

      const html = renderPage({
        title: `${categoryLabel} · Visual Continuity MPA Demo`,
        component: CategoryPage as unknown as ComponentType<Record<string, unknown>>,
        props: {
          products: categoryProducts,
          category: slug,
          categoryLabel,
          demoConfig,
        },
        clientEntry: "/src/client/category.tsx",
        demoConfig,
        dev: ctx.dev,
        cssHrefs: ctx.cssHrefs,
        scriptTags: ctx.getClientScripts("category", pageData),
      });

      return reply.type("text/html").send(html);
    },
  );
}

export type { DemoConfig };
