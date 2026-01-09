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

const RecommendContentOutputSchema = z.object({
  recommendedContent: z
    .string()
    .describe('The recommended content based on user prayer requests and viewing habits.'),
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
  prompt: `You are an AI assistant designed to recommend relevant ministry content to users based on their prayer requests and viewing habits.

  Given the user's prayer requests: {{{prayerRequests}}}
  And their viewing habits: {{{viewingHabits}}}
  And the available content: {{{availableContent}}}

  Recommend the best content to the user, return only the content name.
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
