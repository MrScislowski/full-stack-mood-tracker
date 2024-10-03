import axios from "axios";
import { MoodEntry } from "../../../types";

const backendBaseUrl = "http://localhost:3000";

const postMoodEntry = async (
  entry: Omit<MoodEntry, "id" | "timestamp">,
): Promise<MoodEntry> => {
  const mood = entry;
  const response = await axios.post(`${backendBaseUrl}/api/entries`, mood);
  return response.data;
};

export default { postMoodEntry };
