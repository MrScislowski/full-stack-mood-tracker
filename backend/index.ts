import express from "express";
import cors from "cors";
import path from "path";
import { newMoodEntrySchema } from "../types";
import entriesService from "./services/entriesService";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const frontendBuildDir =
  process.env.NODE_ENV === "development"
    ? "../frontend/dist"
    : "./frontend/dist";

app.use(express.static(path.resolve(frontendBuildDir))); // serves up the frontend

app.get("/api/hello", (req, res) => {
  res.send("hello!");
});

app.get("/api/entries", async (req, res) => {
  const response = await entriesService.getAll();
  res.json(response);
});

app.post("/api/entries", async (req, res) => {
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
