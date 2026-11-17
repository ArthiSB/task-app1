import test from "node:test";
import assert from "node:assert";
import { toTask } from "./task-utils.js";

test("converts MySQL task row into JavaScript task", () => {
  const input = {
    id: 1,
    title: "Learn CI/CD",
    done: 1,
  };

  const expected = {
    id: 1,
    title: "Learn CI/CD",
    done: true,
  };

  assert.deepStrictEqual(toTask(input), expected);
});
