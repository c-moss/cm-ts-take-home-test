import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): boolean => {
  console.log(`Deleting insight for id=${input.id}`);

  const result = input.db.exec(
    `DELETE FROM insights WHERE id = ${input.id}`,
  );

  if (result > 0) {
    console.log("Deleted insight successfully: ", input.id);
    return true;
  } else {
    console.error("Insight not deleted: ", input.id); //TODO: handle error better
    return false;
  }
};
