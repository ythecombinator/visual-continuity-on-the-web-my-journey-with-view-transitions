import middie from "@fastify/middie";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { registerPageRoutes } from "./routes/pages.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const isDev = process.env.NODE_ENV !== "production";
const PORT = Number(process.env.PORT ?? 3000);

interface ViteManifestEntry {
  file: string;
  css?: string[];
  imports?: string[];
}

type ViteManifest = Record<string, ViteManifestEntry>;

function loadManifest(): ViteManifest {
  const manifestPath = join(ROOT, "dist/client/.vite/manifest.json");
  if (!existsSync(manifestPath)) {
    throw new Error(
      "Production manifest not found. Run `npm run build` before `npm start`.",
    );
  }
  return JSON.parse(readFileSync(manifestPath, "utf8")) as ViteManifest;
}

function manifestEntryForClientEntry(
  manifest: ViteManifest,
  entry: string,
): ViteManifestEntry {
  const key = `src/client/${entry}.tsx`;
  const manifestEntry = manifest[key];
  if (!manifestEntry) {
    throw new Error(`Manifest entry not found for ${key}`);
  }
  return manifestEntry;
}

function collectCssFromManifest(
  manifest: ViteManifest,
  entry: ViteManifestEntry,
): string[] {
  const css = new Set<string>(entry.css ?? []);
  for (const imported of entry.imports ?? []) {
    const importedEntry = manifest[imported];
    if (importedEntry?.css) {
      for (const href of importedEntry.css) {
        css.add(href);
      }
    }
  }
  return [...css].map((file) => `/${file}`);
}

function buildProductionScriptTags(
  entry: string,
  pageData?: Record<string, unknown>,
): string {
  const manifest = loadManifest();
  const manifestEntry = manifestEntryForClientEntry(manifest, entry);
  const pageDataScript = pageData
    ? `<script>window.__PAGE_DATA__ = ${JSON.stringify(pageData).replace(/</g, "\\u003c")};</script>\n    `
    : "";

  return `${pageDataScript}<script type="module" crossorigin src="/${manifestEntry.file}"></script>`;
}

async function createApp(vite?: ViteDevServer) {
  const app = Fastify({ logger: isDev });

  const cssHrefs = isDev
    ? ["/src/styles/global.css"]
    : collectCssFromManifest(
        loadManifest(),
        manifestEntryForClientEntry(loadManifest(), "welcome"),
      );

  const getClientScripts = isDev
    ? (_entry: string, pageData?: Record<string, unknown>) => {
        if (!pageData) return "";
        return `<script>window.__PAGE_DATA__ = ${JSON.stringify(pageData).replace(/</g, "\\u003c")};</script>`;
      }
    : (entry: string, pageData?: Record<string, unknown>) =>
        buildProductionScriptTags(entry, pageData);

  await registerPageRoutes(app, {
    dev: isDev,
    cssHrefs,
    getClientScripts,
  });

  if (isDev && vite) {
    await app.register(middie);
    app.use(vite.middlewares);
  } else if (!isDev) {
    await app.register(fastifyStatic, {
      root: join(ROOT, "dist/client"),
      prefix: "/",
    });
  }

  return app;
}

async function main() {
  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer({
      root: ROOT,
      server: { middlewareMode: true },
      appType: "custom",
    });
  }

  const app = await createApp(vite);
  await app.listen({ port: PORT, host: "0.0.0.0" });
  console.log(`Session Pulse MPA Demo running at http://localhost:${PORT}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
