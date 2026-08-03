import { hydrateRoot } from "react-dom/client";
import { ProductDetailPage } from "@/pages/ProductDetailPage.server";
import type { DemoConfig } from "@/shared/demo-config";
import { DEFAULT_DEMO_CONFIG } from "@/shared/demo-config";
import type { ProductDetailPageData } from "@/types/page-data";
import "@/styles/global.css";
import "@/styles/view-transitions.css";

const root = document.getElementById("root");
const demoConfig =
  (window.__DEMO_CONFIG__ as DemoConfig | undefined) ?? DEFAULT_DEMO_CONFIG;
const pageData = window.__PAGE_DATA__ as ProductDetailPageData | undefined;

if (root && pageData?.product) {
  hydrateRoot(
    root,
    <ProductDetailPage
      product={pageData.product}
      demoConfig={demoConfig}
      backHref={pageData.backHref}
    />,
  );
}
