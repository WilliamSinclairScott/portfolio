import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
