import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

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
    const rows = input.db.sql<
      insightsTable.Row
    >`SELECT * FROM insights WHERE id = ${input.db.lastInsertRowId} LIMIT 1`;

    if (rows.length > 0) {
      const row = rows[0];
      const insight = { ...row, createdAt: new Date(row.createdAt) };
      console.log("Added new insight successfully: ", insight);
      return insight;
    }
  }
  console.log("Insight not added"); //TODO: handle error
  return;
};
