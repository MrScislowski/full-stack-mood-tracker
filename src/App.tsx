function App() {
  const emotionList = ["joy", "sadness", "fear", "anger", "disgust"];

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
