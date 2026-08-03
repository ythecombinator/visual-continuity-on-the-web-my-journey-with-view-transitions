import { renderToString } from "react-dom/server";
import type { ComponentType } from "react";

export interface RenderPageOptions {
  title: string;
  component: ComponentType<Record<string, unknown>>;
  props: Record<string, unknown>;
  clientEntry: string;
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
    ${cssLinks}
    <script>${NAVIGATION_TYPE_SCRIPT}</script>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    ${clientScript}
  </body>
</html>`;
}
