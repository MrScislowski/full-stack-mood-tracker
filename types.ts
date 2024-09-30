import * as z from "zod";

export const MoodEnum = z.enum(["joy", "sadness", "fear", "anger", "disgust"]);

export const newMoodEntrySchema = z.object({
  timestamp: z.string().datetime(),
  mood: MoodEnum,
});
