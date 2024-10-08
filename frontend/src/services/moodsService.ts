import axios from "axios";
import { MoodEntry } from "../../../types";
import config from "../config";

const postMoodEntry = async (
  entry: Omit<MoodEntry, "id" | "timestamp">,
): Promise<MoodEntry> => {
  const mood = entry;
  const response = await axios.post(`${config.BACKEND_URL}/api/entries`, mood);
  return response.data;
};

export default { postMoodEntry };
