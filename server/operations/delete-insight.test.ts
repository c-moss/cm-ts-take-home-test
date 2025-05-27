import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights from the database", () => {
  const insights: Insight[] = [
    { id: 1, brand: 0, createdAt: new Date(), text: "1" },
    { id: 2, brand: 0, createdAt: new Date(), text: "2" },
    { id: 3, brand: 1, createdAt: new Date(), text: "3" },
    { id: 4, brand: 4, createdAt: new Date(), text: "4" },
  ];

  describe("deleting an existing insight", () => {
    withDB((fixture) => {
      const insightId = 1;

      let result: boolean;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = deleteInsight({ ...fixture, id: insightId });
      });

      it("returns true", () => {
        expect(result).toBeTruthy();
      });

      it("deletes the expected record", () => {
        const rows = fixture.insights.selectAll();
        expect(rows.length).toBe(3);
        const recordFound = rows.some(
          (row) => row.id === insightId,
        );
        expect(recordFound).toBeFalsy();
      });
    });
  });

  describe("deleting a nonexistent insight", () => {
    withDB((fixture) => {
      const insightId = 7;

      let result: boolean;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = deleteInsight({ ...fixture, id: insightId });
      });

      it("returns false", () => {
        expect(result).toBeFalsy();
      });

      it("doesn't delete any records", () => {
        const rows = fixture.insights.selectAll();
        expect(rows.length).toBe(4);
      });
    });
  });
});
