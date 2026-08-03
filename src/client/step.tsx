import { hydrateRoot } from "react-dom/client";
import { StepPage } from "@/pages/StepPage.server";
import type { StepPageData } from "@/types/page-data";
import "@/styles/global.css";

const root = document.getElementById("root");
const pageData = window.__PAGE_DATA__ as StepPageData | undefined;

if (root && pageData?.step) {
  hydrateRoot(root, <StepPage step={pageData.step} />);
}
