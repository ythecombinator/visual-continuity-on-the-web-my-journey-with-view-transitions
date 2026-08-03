import { hydrateRoot } from "react-dom/client";
import { WelcomePage } from "@/pages/WelcomePage.server";
import "@/styles/global.css";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <WelcomePage />);
}
