import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Insights } from "./insights.tsx";

const TEST_INSIGHTS = [
  {
    id: 1,
    brand: 1,
    createdAt: new Date(),
    text: "Test insight",
  },
  { id: 2,
    brand: 2,
    createdAt: new Date(),
    text: "Another test insight" 
  },
];

describe("insights", () => {
  //TODO: expand tests to examine all fields and list items, using data-testid to find elements
  it("renders", () => {
    const { getByText } = render(<Insights insights={TEST_INSIGHTS} />);
    expect(getByText(TEST_INSIGHTS[0].text)).toBeTruthy();
  });

  it("renders no-data state", () => {
    const { getByText } = render(<Insights insights={[]} />);
    expect(getByText("We have no insight!")).toBeTruthy();
  });

});
