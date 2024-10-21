import { MoodEntry } from "shared";

interface MoodLogProps {
  emotionLog: MoodEntry[];
}

const MoodLog = ({ emotionLog }: MoodLogProps) => {
  return (
    <>
      <p className="px-4">Emotions chosen so far:</p>
      <ul className="px-2 list-disc list-inside">
        {emotionLog.map((entry) => {
          return (
            <li className="px-2" key={entry.id}>
              {entry.mood}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MoodLog;
