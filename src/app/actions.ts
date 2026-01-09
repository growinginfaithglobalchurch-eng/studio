'use server';

import { recommendContent } from '@/ai/flows/content-recommendations';
import { availableContent } from '@/lib/data';

export async function getRecommendedContent() {
  // In a real app, this data would be fetched from a database for the current user.
  const mockUserInput = {
    prayerRequests: 'Healing for my family, financial breakthrough',
    viewingHabits: 'Listens to sermons on faith, watches leadership training videos',
    availableContent: availableContent.join(', '),
  };

  try {
    const recommendation = await recommendContent(mockUserInput);
    return recommendation;
  } catch (error) {
    console.error('AI recommendation failed:', error);
    // Return a default or fallback recommendation
    return { recommendedContent: 'Faith that Moves Mountains' };
  }
}
