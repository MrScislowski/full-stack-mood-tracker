import { MoodEnum, ZodMoodEnum } from "../../types";
import moodsService from "./services/moodsService";

function App() {
  const emotionList = ZodMoodEnum.options;

  const handleClick = (emotion: MoodEnum) => {
    moodsService.postMoodEntry({ mood: emotion });
  };
  return (
    <>
      <p>Welcome to the mood tracker</p>
      <p>Current build from Monday 7th Oct @ 7:40am</p>
      <p>Choose an emotion below:</p>
      {emotionList.map((emotion) => (
        <button key={emotion} onClick={() => handleClick(emotion)}>
          {emotion}
        </button>
      ))}
    </>
  );
}

export default App;
