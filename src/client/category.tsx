import { hydrateRoot } from "react-dom/client";
import { CategoryPage } from "@/pages/CategoryPage.server";
import type { DemoConfig } from "@/shared/demo-config";
import { DEFAULT_DEMO_CONFIG } from "@/shared/demo-config";
import type { CategoryPageData } from "@/types/page-data";
import "@/styles/global.css";
import "@/styles/view-transitions.css";

const root = document.getElementById("root");
const demoConfig =
  (window.__DEMO_CONFIG__ as DemoConfig | undefined) ?? DEFAULT_DEMO_CONFIG;
const pageData = window.__PAGE_DATA__ as CategoryPageData | undefined;

if (root && pageData?.products) {
  hydrateRoot(
    root,
    <CategoryPage
      products={pageData.products}
      category={pageData.category}
      categoryLabel={pageData.categoryLabel}
      demoConfig={demoConfig}
    />,
  );
}
