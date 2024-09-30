import * as express from "express";
import { newMoodEntrySchema } from "../types";
import entriesService from "./services/entriesService";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("../dist")); // serves up the frontend

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
