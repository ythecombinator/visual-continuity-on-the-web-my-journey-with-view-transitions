import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import type { ComponentType } from "react";
import { surveyPathOrder } from "@/shared/view-transition";

export interface RenderPageOptions {
  title: string;
  component: ComponentType<Record<string, unknown>>;
  props: Record<string, unknown>;
  clientEntry: string;
  dev?: boolean;
  cssHrefs?: string[];
  scriptTags?: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIEW_TRANSITIONS_CSS = readFileSync(
  join(__dirname, "../styles/view-transitions.css"),
  "utf8",
);

/**
 * Early head script: assign cross-document transition types from route order,
 * and surface the 4s timeout (TimeoutError) in the console for demos/debugging.
 */
function buildViewTransitionLifecycleScript(pathOrder: string[]): string {
  const orderJson = JSON.stringify(pathOrder);
  return `
(function () {
  var ORDER = ${orderJson};
  window.__SURVEY_PATH_ORDER__ = ORDER;

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/";
    return pathname.replace(/\\/+$/, "") || "/";
  }

  function rank(pathname) {
    return ORDER.indexOf(normalizePath(pathname));
  }

  function typeFrom(fromUrl, toUrl) {
    try {
      var from = rank(new URL(fromUrl, location.origin).pathname);
      var to = rank(new URL(toUrl, location.origin).pathname);
      if (from < 0 || to < 0) return "forwards";
      if (from === to) return "reload";
      var doneRank = ORDER.length - 1;
      if (to === doneRank && to > from) return "finish";
      return to > from ? "forwards" : "backwards";
    } catch (_) {
      return "forwards";
    }
  }

  function applyTypes(vt, fromUrl, toUrl) {
    if (!vt || !vt.types) return;
    var t = typeFrom(fromUrl, toUrl);
    try { vt.types.clear(); } catch (_) {}
    try { vt.types.add(t); } catch (_) {}
    document.documentElement.setAttribute("data-vt-type", t);
  }

  function watchFinished(vt) {
    if (!vt || !vt.finished) return;
    vt.finished
      .then(function () {
        console.info(
          "[vt] transition completed",
          document.documentElement.getAttribute("data-vt-type") || "(none)",
        );
      })
      .catch(function (err) {
        console.warn(
          "[vt] transition aborted:",
          err && err.name,
          err && err.message,
        );
      });
  }

  window.addEventListener("pageswap", function (event) {
    if (!event.viewTransition || !event.activation || !event.activation.entry) {
      return;
    }
    var from =
      (event.activation.from && event.activation.from.url) || location.href;
    var to = event.activation.entry.url;
    applyTypes(event.viewTransition, from, to);
    watchFinished(event.viewTransition);
  });

  window.addEventListener("pagereveal", function (event) {
    if (!event.viewTransition) return;
    var nav = window.navigation;
    var from =
      nav && nav.activation && nav.activation.from && nav.activation.from.url;
    var to =
      (nav &&
        nav.activation &&
        nav.activation.entry &&
        nav.activation.entry.url) ||
      location.href;
    if (from && to) {
      applyTypes(event.viewTransition, from, to);
    }
    watchFinished(event.viewTransition);
  });
})();
`.trim();
}

/** Required before any React modules load when using a custom Vite SSR HTML shell. */
const REACT_REFRESH_PREAMBLE = `
<script type="module">
import RefreshRuntime from "/@react-refresh";
RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;
window.__vite_plugin_react_preamble_installed__ = true;
</script>
`.trim();

export function renderPage({
  title,
  component: Page,
  props,
  clientEntry,
  dev = false,
  cssHrefs = [],
  scriptTags = "",
}: RenderPageOptions): string {
  const appHtml = renderToString(<Page {...props} />);
  const lifecycleScript = buildViewTransitionLifecycleScript(surveyPathOrder());

  const cssLinks = cssHrefs
    .map((href) => `<link rel="stylesheet" href="${href}" />`)
    .join("\n    ");

  const clientScript = dev
    ? `${scriptTags}<script type="module" src="${clientEntry}"></script>`
    : scriptTags;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet" />
    <style>${VIEW_TRANSITIONS_CSS}</style>
    ${cssLinks}
    <script>${lifecycleScript}</script>
    ${dev ? REACT_REFRESH_PREAMBLE : ""}
  </head>
  <body>
    <div id="root">${appHtml}</div>
    ${clientScript}
  </body>
</html>`;
}
