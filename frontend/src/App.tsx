import { useEffect, useState } from "react";
import { moodEntrySchema, MoodEntry } from "shared";
import moodsService from "./services/moodsService";
import AppTitle from "./components/AppTitle";
import MoodChooser from "./components/MoodChooser";
import MoodLog from "./components/MoodLog";

function App() {
  const [emotionLog, setEmotionLog] = useState<MoodEntry[]>([]);
  useEffect(() => {
    moodsService.getMoodEntries().then((entries) => {
      setEmotionLog(entries.map((entry) => moodEntrySchema.parse(entry)));
    });
  }, []);

  return (
    <>
      <AppTitle />

      <MoodChooser emotionLog={emotionLog} setEmotionLog={setEmotionLog} />

      <MoodLog emotionLog={emotionLog} />
    </>
  );
}

export default App;
