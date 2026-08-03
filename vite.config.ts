import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist/client",
    manifest: true,
    rollupOptions: {
      input: {
        welcome: resolve(__dirname, "src/client/welcome.tsx"),
        step: resolve(__dirname, "src/client/step.tsx"),
        done: resolve(__dirname, "src/client/done.tsx"),
      },
    },
  },
  ssr: {
    noExternal: ["react", "react-dom"],
  },
});
