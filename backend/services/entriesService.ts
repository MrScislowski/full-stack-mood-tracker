import axios from "axios";
import { MoodEntry, MoodEntrySansId } from "../../types";

const baseUrl = "http://localhost:3001";

const addEntry = (entry: MoodEntrySansId): Promise<MoodEntry> => {
  return axios.post(`${baseUrl}/entries`, entry).then((res) => res.data);
};

export default { addEntry };
