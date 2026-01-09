'use server';

/**
 * @fileOverview An AI agent that recommends ministry content based on user prayer requests and viewing habits.
 *
 * - recommendContent - A function that handles the content recommendation process.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  prayerRequests: z
    .string()
    .describe('The user prayer requests, comma separated.'),
  viewingHabits: z
    .string()
    .describe('The user viewing habits, comma separated.'),
  availableContent: z
    .string()
    .describe('The list of available ministry contents, comma separated.'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendedItemSchema = z.object({
  title: z.string().describe('The title of the recommended content.'),
  reason: z.string().describe('A brief reason why this content is recommended.'),
});

const RecommendContentOutputSchema = z.object({
  devotional: RecommendedItemSchema.describe('A recommended devotional.'),
  course: RecommendedItemSchema.describe('A recommended course or teaching series.'),
  communityGroup: RecommendedItemSchema.describe('A recommended community group or ministry to connect with.'),
  prayerFocus: RecommendedItemSchema.describe('A recommended area to focus on in prayer.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(
  input: RecommendContentInput
): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are an AI assistant designed to recommend a personalized Faith Path for users based on their interests and activities.

  Given the user's prayer requests: {{{prayerRequests}}}
  And their viewing habits: {{{viewingHabits}}}
  And the available content: {{{availableContent}}}

  Recommend one item for each of the following categories: Devotional, Course, Community Group, and Prayer Focus.
  The recommendations should be from the "available content" list where appropriate.
  For each recommendation, provide a title and a short, encouraging reason why it's a good fit for the user.
  `,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
