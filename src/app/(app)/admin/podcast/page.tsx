
'use client';

import { LiveControlPanel } from '@/components/podcast/LiveControlPanel';

export default function AdminPodcastPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Podcast Studio
        </h1>
        <p className="text-muted-foreground">
          Manage your podcast episodes, schedule new recordings, and go live.
        </p>
      </div>

      <LiveControlPanel />
    </div>
  );
}
