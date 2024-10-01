import express from "express";
import path from "path";
import { newMoodEntrySchema } from "../types";
import entriesService from "./services/entriesService";

const app = express();
const PORT = 3000;

app.use(express.json());

const frontendBuildDir =
  process.env.NODE_ENV === "dev" ? "../frontend/dist" : "./frontend/dist";

app.use(express.static(path.resolve(frontendBuildDir))); // serves up the frontend

app.get("/api/hello", (req, res) => {
  res.send("hello!");
});

app.post("/api/entries", async (req, res) => {
  console.log(req.body);
  const newMoodEntry = newMoodEntrySchema.parse({
    ...req.body,
    timestamp: new Date().toISOString(),
  });
  const response = await entriesService.addEntry(newMoodEntry);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
