import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { spawn } from "child_process";
import entriesService from "../services/entriesService";
import { MoodEntrySansId } from "../../types";

import { cwd } from "node:process";

let server;

beforeAll(() => {
  return new Promise<void>((resolve) => {
    server = spawn("json-server", ["--watch", "db.json", "--port", "3001"]);
    server.stdout.on("data", (data) => {
      if (data.toString().includes("JSON Server started")) {
        resolve();
      }
    });
  });
});

afterAll(async () => {
  await entriesService.deleteAll();
  return new Promise<void>((resolve) => {
    server.kill();
    resolve();
  });
});

beforeEach(async () => {
  await entriesService.deleteAll();
});

const testEntries: MoodEntrySansId[] = [
  {
    mood: "disgust",
    timestamp: new Date().toISOString(),
  },
  {
    mood: "anger",
    timestamp: new Date().toISOString(),
  },
  {
    mood: "joy",
    timestamp: new Date().toISOString(),
  },
];

describe("Proper Database Interaction", () => {
  test("db starts empty", async () => {
    const contents = await entriesService.getAll();
    expect(contents).toHaveLength(0);
  });

  test("adding element increases db document count by 1", async () => {
    const initialContents = await entriesService.getAll();
    await entriesService.addEntry(testEntries[0]);
    const finalContents = await entriesService.getAll();
    expect(finalContents).toHaveLength(initialContents.length + 1);
  });

  test("added element is found in DB", async () => {
    const addedEntry = testEntries[0];
    await entriesService.addEntry(addedEntry);
    const finalContents = await entriesService.getAll();
    const foundEntry = finalContents.find(
      (entry) =>
        entry.mood === addedEntry.mood &&
        entry.timestamp === addedEntry.timestamp,
    );
    expect(foundEntry).toBeDefined();
  });
});
