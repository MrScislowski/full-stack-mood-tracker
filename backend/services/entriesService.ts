import axios from "axios";
import { MoodEntry, MoodEntrySansId } from "../../types";

const baseUrl = "http://localhost:3001/entries";

const addEntry = async (entry: MoodEntrySansId): Promise<MoodEntry> => {
  const response = await axios.post(`${baseUrl}`, entry);
  return response.data;
};

const getAll = async (): Promise<MoodEntry[]> => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const deleteAll = async (): Promise<boolean> => {
  const entries = await getAll();
  await Promise.all(
    entries.map((entry) => axios.delete(`${baseUrl}/${entry.id}`)),
  );
  return true;
};

export default { getAll, addEntry, deleteAll };
