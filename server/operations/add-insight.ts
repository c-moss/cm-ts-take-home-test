import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import lookupInsight from "./lookup-insight.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight | undefined => {
  console.log("Adding insight");

  const now = new Date().toISOString();

  const result = input.db.exec(
    `INSERT INTO insights (brand, createdAt, text) VALUES (?, ?, ?)`,
    [input.brand, now, input.text],
  );

  if (result > 0) {
    // Fetch the newly inserted record
    const insight = lookupInsight({ ...input, id: input.db.lastInsertRowId });

    if (insight) {
      console.log("Added new insight successfully: ", insight);
      return insight;
    }
  }
  console.error("Insight not added"); //TODO: handle error better
  return;
};
