
import {onDocumentWritten} from 'firebase-functions/v2/firestore';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

initializeApp();
const db = getFirestore();

// Generic listener count function
const createListenerCounter = (
  collectionName: string,
  listenerCollectionName: string
) => {
  return onDocumentWritten(
    `${collectionName}/{roomId}/listeners/{listenerId}`,
    async event => {
      const roomId = event.params.roomId;
      const listenersRef = db.collection(
        `${collectionName}/${roomId}/listeners`
      );
      const listenerCountDoc = db.doc(`${listenerCollectionName}/${roomId}`);

      const snapshot = await listenersRef.get();
      const count = snapshot.size;

      return listenerCountDoc.set({count}, {merge: true});
    }
  );
};

// Create counters for both podcasts and radio
export const podcastListenerCount = createListenerCounter(
  'liveRooms',
  'podcastListeners'
);
export const radioListenerCount = createListenerCounter(
  'radioShows',
  'radioListeners'
);
