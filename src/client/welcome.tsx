import { hydrateRoot } from "react-dom/client";
import { WelcomePage } from "@/pages/welcome-page";
import "@/styles/global.css";

const root = document.getElementById("root");

if (root) {
  hydrateRoot(root, <WelcomePage />);
}
