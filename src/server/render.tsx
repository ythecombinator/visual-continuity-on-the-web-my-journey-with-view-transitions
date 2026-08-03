import { renderToString } from "react-dom/server";
import type { ComponentType } from "react";
import type { DemoConfig } from "@/shared/demo-config";

export interface RenderPageOptions {
  title: string;
  component: ComponentType<Record<string, unknown>>;
  props: Record<string, unknown>;
  clientEntry: string;
  demoConfig: DemoConfig;
  dev?: boolean;
  cssHrefs?: string[];
  scriptTags?: string;
}

const NAVIGATION_TYPE_SCRIPT = `
(function () {
  var nav = window.navigation;
  if (!nav || !nav.activation) return;
  var type = nav.activation.navigationType;
  if (type === 'push' || type === 'replace') {
    document.documentElement.classList.add('vt-forward');
  } else if (type === 'traverse') {
    document.documentElement.classList.add('vt-back');
  } else if (type === 'reload') {
    document.documentElement.classList.add('vt-reload');
  }
  if (type) {
    document.documentElement.setAttribute('data-navigation-type', type);
  }
})();
`.trim();

function htmlClassList(config: DemoConfig): string {
  const classes = [];
  if (config.forceReducedMotion) classes.push("force-reduced-motion");
  if (config.disableCrossDocumentVT) classes.push("disable-cross-document-vt");
  return classes.join(" ");
}

export function renderPage({
  title,
  component: Page,
  props,
  clientEntry,
  demoConfig,
  dev = false,
  cssHrefs = [],
  scriptTags = "",
}: RenderPageOptions): string {
  const appHtml = renderToString(<Page {...props} />);
  const htmlClass = htmlClassList(demoConfig);
  const demoConfigJson = JSON.stringify(demoConfig).replace(/</g, "\\u003c");

  const cssLinks = cssHrefs
    .map((href) => `<link rel="stylesheet" href="${href}" />`)
    .join("\n    ");

  const clientScript = dev
    ? `${scriptTags}<script type="module" src="${clientEntry}"></script>`
    : scriptTags;

  return `<!DOCTYPE html>
<html lang="en"${htmlClass ? ` class="${htmlClass}"` : ""}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${cssLinks}
    <script>${NAVIGATION_TYPE_SCRIPT}</script>
    <script>window.__DEMO_CONFIG__ = ${demoConfigJson};</script>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    ${clientScript}
  </body>
</html>`;
}
