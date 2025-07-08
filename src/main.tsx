import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.scss";
import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
