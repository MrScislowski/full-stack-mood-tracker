import { useEffect, useState } from "react";
import { moodEntrySchema, MoodEnum, MoodEntry, ZodMoodEnum } from "../../types";
import moodsService from "./services/moodsService";
import AppTitle from "./components/AppTitle";

function App() {
  const [emotionLog, setEmotionLog] = useState<MoodEntry[]>([]);
  const emotionList = ZodMoodEnum.options;

  const handleClick = async (emotion: MoodEnum) => {
    const newMoodEntry = await moodsService.postMoodEntry({ mood: emotion });
    setEmotionLog([...emotionLog, newMoodEntry]);
  };

  useEffect(() => {
    moodsService.getMoodEntries().then((entries) => {
      setEmotionLog(entries.map((entry) => moodEntrySchema.parse(entry)));
    });
  }, []);

  return (
    <>
      <AppTitle />
      <p>Choose an emotion below:</p>
      <div style={{ display: "flex" }}>
        {emotionList.map((emotion) => (
          <button key={emotion} onClick={() => handleClick(emotion)}>
            {emotion}
          </button>
        ))}
      </div>
      <div>Emotions chosen so far:</div>
      <ul>
        {emotionLog.map((entry) => {
          return <li key={entry.id}>{entry.mood}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
