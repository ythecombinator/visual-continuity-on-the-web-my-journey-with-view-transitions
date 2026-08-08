# Session Pulse

MPA demo for the talk [Visual Continuity on the Web: My Journey With View Transitions](https://www.ythecombinator.space/talks/visual-continuity-on-the-web-my-journey-with-view-transitions).

A Typeform-style multi-step survey built as a real multi-page app (Fastify + React SSR + Vite). There is no client-side router. Navigation uses normal document loads, with cross-document [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) for shared chrome (progress, nav, titles) and directional page motion.

Answers stay in `localStorage` in this browser only. Nothing is posted to a server.

## Stack

- Fastify server + Vite SSR/hydration entries per page
- React 19, Tailwind CSS, TanStack Form + Zod
- Cross-document View Transitions (`@view-transition`, shared names/classes, transition types)

## Routes

| Path | Page |
| --- | --- |
| `/` | Welcome |
| `/steps/:slug` | Survey steps (`pulse`, `sessions`, `venue`) |
| `/done` | Summary |

## Local development

Requires Node 20+.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (default `http://localhost:3000`).

```bash
npm run build
npm start
```

## Deploy

`railway.toml` and `render.yaml` are included. Build with `npm install --include=dev && npm run build`, start with `npm start`.
