
'use server';

import {
  doc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';

export async function startLiveShow(
  showId: string,
  title: string,
  host: string,
  tribe: string | null,
  isRadio: boolean
) {
  const collectionName = isRadio ? 'radioShows' : 'liveRooms';
  const showRef = doc(db, collectionName, showId);

  try {
    const showData: {
      title: string;
      host: string;
      isLive: boolean;
      createdAt: any;
      allowedTribes?: string[];
    } = {
      title,
      host,
      isLive: true,
      createdAt: new Date(),
    };

    if (tribe) {
      showData.allowedTribes = [tribe];
    } else {
      showData.allowedTribes = ['All'];
    }

    await setDoc(showRef, showData);

    revalidatePath(isRadio ? '/radio' : '/podcast');
    return { success: true, showId };
  } catch (error) {
    console.error('Error starting live show:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function endLiveShow(showId: string, isRadio: boolean) {
  const collectionName = isRadio ? 'radioShows' : 'liveRooms';
  const showRef = doc(db, collectionName, showId);
  try {
    await updateDoc(showRef, {
      isLive: false,
      endedAt: new Date(),
    });
    revalidatePath(isRadio ? '/radio' : '/podcast');
    return { success: true };
  } catch (error) {
    console.error('Error ending live show:', error);
    return { success: false, error: (error as Error).message };
  }
}
