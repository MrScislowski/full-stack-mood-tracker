import axios from "axios";
import { MoodEntry } from "shared";
import config from "../config";

const postMoodEntry = async (
  entry: Omit<MoodEntry, "id" | "timestamp">,
): Promise<MoodEntry> => {
  const mood = entry;
  const response = await axios.post(`${config.BACKEND_URL}/entries`, mood);
  return response.data;
};

const getMoodEntries = async (): Promise<MoodEntry[]> => {
  const response = await axios.get(`${config.BACKEND_URL}/entries`);
  return response.data;
};

export default { postMoodEntry, getMoodEntries };
