import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@radix-ui/themes/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme
      appearance="dark"
      accentColor='violet'
      grayColor="sage"
      // panelBackground="translucent"
    >
      <App />
    </Theme>
  </React.StrictMode>
);
