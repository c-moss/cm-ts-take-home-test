import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import addInsight from "./add-insight.ts";

describe("adding insights to the database", () => {
  describe("adding a single insight", () => {
    withDB((fixture) => {
      const insight: Omit<Insight, "id" | "createdAt"> = {
        brand: 0,
        text: "Test insight",
      };

      let result: Insight | undefined;

      beforeAll(() => {
        result = addInsight({ ...fixture, brand: 0, text: "Test insight" });
      });

      it("returns created insight", () => {
        expect(result).toMatchObject(insight);
      });

      it("assigns an id", () => {
        expect(result?.id).toBeDefined();
      });

      it("sets creation timestamp", () => {
        expect(result?.createdAt).toBeInstanceOf(Date);
      });

      it("persists to database", () => {
        const rows = fixture.insights.selectAll();
        expect(rows.length).toBe(1);
        const stored = rows.find(
          (it) => it.id === result?.id,
        );
        expect(stored).toBeDefined();
        expect(stored?.createdAt).toBe(result?.createdAt.toISOString());
      });
    });
  });
});
