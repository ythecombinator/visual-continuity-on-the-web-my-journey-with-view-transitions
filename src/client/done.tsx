import { hydrateRoot } from "react-dom/client";
import { DonePage } from "@/pages/done-page";
import "@/styles/global.css";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <DonePage />);
}
