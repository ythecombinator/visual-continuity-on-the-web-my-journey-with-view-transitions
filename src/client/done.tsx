import { hydrateRoot } from "react-dom/client";
import { DonePage } from "@/pages/DonePage.server";
import "@/styles/global.css";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <DonePage />);
}
