import axios from "axios";
import { MoodEntry, MoodEntrySansId } from "../../types";

const baseUrl = "http://localhost:3001/entries";

const addEntry = (entry: MoodEntrySansId): Promise<MoodEntry> => {
  return axios.post(`${baseUrl}`, entry).then((res) => res.data);
};

const getAll = (): Promise<MoodEntry[]> => {
  return axios.get(`${baseUrl}`).then((res) => res.data);
};

const deleteAll = (): Promise<boolean> => {
  return getAll().then((entries) => {
    return Promise.all(
      entries.map((entry) => axios.delete(`${baseUrl}/${entry.id}`)),
    )
      .then(() => true)
      .catch(() => false);
  });
};

export default { getAll, addEntry, deleteAll };
