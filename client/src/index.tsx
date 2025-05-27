import { createRoot } from "react-dom/client";
import { App } from "./routes/app.tsx";
import "./styles/index.ts";
import { InsightsProvider } from "./hooks/InsightsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <InsightsProvider>
    <App />
  </InsightsProvider>,
);
