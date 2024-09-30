import * as express from "express";
import { newMoodEntrySchema } from "./types";

const app = express();
const PORT = 3000;

app.use(express.static("dist")); // serves up the frontend

app.get("/api/hello", (req, res) => {
  res.send("hello!");
});

app.post("/api/entries", (req, res) => {
  const newMoodEntry = newMoodEntrySchema.parse(req.body);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
