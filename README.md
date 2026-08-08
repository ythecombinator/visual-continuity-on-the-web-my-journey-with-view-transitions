# Session Pulse

MPA demo for the talk [Visual Continuity on the Web: My Journey With View Transitions](https://www.ythecombinator.space/talks/visual-continuity-on-the-web-my-journey-with-view-transitions).

A Typeform-style multi-step survey built as a real multi-page app. There is **no client-side router**. Navigation uses normal document loads, with cross-document [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) for shared chrome (progress, nav, titles) and directional page motion.

> 🔒 Answers stay in `localStorage` in this browser only. Nothing is posted to a server.

## 🧰 Tech stack

- [React](https://github.com/facebook/react) 19
- [Vite](https://github.com/vitejs/vite)
- [Fastify](https://github.com/fastify/fastify)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss)
- [shadcn/ui](https://ui.shadcn.com/) + [Base UI](https://github.com/mui/base-ui)
- [TanStack Form](https://github.com/TanStack/form)
- [Zod](https://github.com/colinhacks/zod)
- [Lucide](https://github.com/lucide-icons/lucide)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

## 🗺️ Routes

| Path | Page |
| --- | --- |
| `/` | Welcome |
| `/steps/:slug` | Survey steps (`pulse`, `sessions`, `venue`) |
| `/done` | Summary |

## 🚀 Local development

Requires Node `20+`.

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (default `http://localhost:3000`).

```bash
npm run build
npm start
```

## ☁️ Deploy

`railway.toml` and `render.yaml` are included for [Railway](https://railway.app/) and [Render](https://render.com/).

Build with `npm install --include=dev && npm run build`, start with `npm start`.
