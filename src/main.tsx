import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/login.css";
import "./styles/hero.css";
import "./styles/timeline.css";
import "./styles/cards.css";
import "./styles/responsive.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element missing");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
