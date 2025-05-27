import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
// @ts-types="./types/css.d.ts"
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";
import { useInsightsContext } from "../hooks/InsightsContext.tsx";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const { needsRefresh, setNeedsRefresh } = useInsightsContext();

  useEffect(() => setNeedsRefresh(true), []);

  useEffect(() => {
    if (needsRefresh) {
      fetch(`/api/insights`)
        .then((res) => res.json())
        .then((insights) => { //TODO: resposne validation
          setInsights(insights);
          setNeedsRefresh(false);
        })
        .catch((error) => {
          console.error("Failed to fetch insights:", error);
          setNeedsRefresh(false);
        });
    }
  }, [needsRefresh, setNeedsRefresh]);

  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights} />
    </main>
  );
};
