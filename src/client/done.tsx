import { hydrateRoot } from "react-dom/client";
import { DonePage } from "@/pages/DonePage";
import "@/styles/global.css";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <DonePage />);
}
