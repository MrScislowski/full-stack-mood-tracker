import { MoodEntry, MoodEnum, ZodMoodEnum } from "../../../types";
import moodsService from "../services/moodsService";

const listOfAllEmotionOptions = ZodMoodEnum.options;

interface MoodChooserProps {
  emotionLog: MoodEntry[];
  setEmotionLog: React.Dispatch<React.SetStateAction<MoodEntry[]>>;
}

const MoodChooser = ({ emotionLog, setEmotionLog }: MoodChooserProps) => {
  const handleClick = async (emotion: MoodEnum) => {
    const newMoodEntry = await moodsService.postMoodEntry({ mood: emotion });
    setEmotionLog([...emotionLog, newMoodEntry]);
  };

  return (
    <>
      <p className="px-4">Choose an emotion below:</p>
      <div className="px-8 flex flex-row justify-evenly">
        {listOfAllEmotionOptions.map((emotion) => (
          <button
            className="bg-slate-300 m-4 p-2 rounded-md"
            key={emotion}
            onClick={() => handleClick(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>
    </>
  );
};

export default MoodChooser;
