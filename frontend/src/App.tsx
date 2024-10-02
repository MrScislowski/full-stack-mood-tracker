import { MoodEnum } from "../../types";

function App() {
  const emotionList = MoodEnum.options;

  return (
    <>
      <p>Welcome to the mood tracker</p>
      <p>Choose an emotion below:</p>
      {emotionList.map((emotion) => (
        <button key={emotion}>{emotion}</button>
      ))}
    </>
  );
}

export default App;
