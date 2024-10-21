import {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from "vitest";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import entriesService from "../services/entriesService";
import { MoodEntrySansId } from "shared";

let server: ChildProcessWithoutNullStreams;

beforeAll(() => {
  return new Promise<void>((resolve) => {
    server = spawn("json-server", ["db.json", "--port", "3001"], {
      shell: true,
    });

    server.stdout.on("data", (data: Buffer): void => {
      console.log(`got message ${data.toString()}`);
      if (data.toString().includes("JSON Server started")) {
        resolve();
      } else {
        console.log(
          `Expected 'JSON Server started'... got: ${data.toString()}`,
        );
      }
    });
    server.stderr.on("data", (data) => {
      console.log(
        `Error: while starting json server, got message: ${data.toString()}`,
      );
    });
    server.on("error", (err) => {
      console.log(`Error starting server: ${JSON.stringify(err, null, 2)}`);
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
