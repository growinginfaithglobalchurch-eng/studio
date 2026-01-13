
'use client';

import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Users } from 'lucide-react';

interface LiveListenerCountProps {
  roomId: string;
  isRadio?: boolean;
}

export function LiveListenerCount({ roomId, isRadio = false }: LiveListenerCountProps) {
  const [listenerCount, setListenerCount] = useState(0);

  useEffect(() => {
    const collectionName = isRadio ? 'radioListeners' : 'podcastListeners';
    const listenersDocRef = doc(db, collectionName, roomId);

    const unsubscribe = onSnapshot(listenersDocRef, (doc) => {
      if (doc.exists()) {
        setListenerCount(doc.data().count || 0);
      } else {
        setListenerCount(0);
      }
    });

    return () => unsubscribe();
  }, [roomId, isRadio]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{listenerCount} listener(s)</span>
    </div>
  );
}
