import { hydrateRoot } from "react-dom/client";
import { HomePage } from "@/pages/HomePage.server";
import { products } from "@/data/products";
import type { DemoConfig } from "@/shared/demo-config";
import { DEFAULT_DEMO_CONFIG } from "@/shared/demo-config";
import "@/styles/global.css";
import "@/styles/view-transitions.css";

const root = document.getElementById("root");
const demoConfig =
  (window.__DEMO_CONFIG__ as DemoConfig | undefined) ?? DEFAULT_DEMO_CONFIG;

if (root) {
  hydrateRoot(
    root,
    <HomePage products={products} demoConfig={demoConfig} />,
  );
}
