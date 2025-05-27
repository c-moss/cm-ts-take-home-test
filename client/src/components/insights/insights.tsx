import { Trash2Icon } from "lucide-react";
import { cx } from "../../lib/cx.ts";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";
import { BRANDS } from "../../lib/consts.ts";
import { useInsightsContext } from "../../hooks/InsightsContext.tsx";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {

  const { setNeedsRefresh } = useInsightsContext();

  const deleteInsight = (brandId: number) => {
    fetch(`api/insights/${brandId}`, {
      method: "DELETE",
    }).then(response => {
      if (response.ok) {
        setNeedsRefresh(true);
      }
    })
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, createdAt, brand }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>{BRANDS.find( b => b.id === brand)?.name ?? brand}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{new Date(createdAt).toLocaleString()}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() => deleteInsight(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>
    </div>
  );
};
