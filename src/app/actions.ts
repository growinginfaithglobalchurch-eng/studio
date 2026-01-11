
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
    return {
      devotional: { title: 'Faith that Moves Mountains', reason: 'To strengthen your faith in tough times.' },
      course: { title: 'Kingdom-Driven Leadership', reason: 'To equip you for greater impact.' },
      communityGroup: { title: 'Global Outreach Missions', reason: 'To connect with others who have a heart for service.' },
      prayerFocus: { title: 'Pray for Wisdom and Guidance', reason: 'To seek God\'s direction in your decisions.' },
    };
  }
}
