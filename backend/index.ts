import express from "express";
import cors from "cors";
import { newMoodEntrySchema } from "shared";
import entriesService from "./services/entriesService.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

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
