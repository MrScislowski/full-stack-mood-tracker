import * as z from "zod";

export const ZodMoodEnum = z.enum([
  "joy",
  "sadness",
  "fear",
  "anger",
  "disgust",
]);
export type MoodEnum = z.infer<typeof ZodMoodEnum>;

export const newMoodEntrySchema = z.object({
  timestamp: z.string().datetime(),
  mood: ZodMoodEnum,
});

export type MoodEntrySansId = z.infer<typeof newMoodEntrySchema>;

export const moodEntrySchema = newMoodEntrySchema.extend({
  id: z.string(),
});

export type MoodEntry = z.infer<typeof moodEntrySchema>;
