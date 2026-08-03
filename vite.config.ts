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
        home: resolve(__dirname, "src/client/home.tsx"),
        "product-detail": resolve(__dirname, "src/client/product-detail.tsx"),
        category: resolve(__dirname, "src/client/category.tsx"),
      },
    },
  },
  ssr: {
    noExternal: ["react", "react-dom"],
  },
});
