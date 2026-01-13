
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Radio,
  Music,
  ListMusic,
  PlusCircle,
  Trash2,
  Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LiveControlPanel } from '@/components/podcast/LiveControlPanel';

type Track = {
  title: string;
  url: string;
};

export default function AdminRadioPage() {
  const { toast } = useToast();
  const [automatedPlaylist, setAutomatedPlaylist] = useState<Track[]>([]);
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const playlistDocRef = doc(db, 'radio', 'automatedPlaylist');
    const unsubscribe = onSnapshot(playlistDocRef, (doc) => {
      if (doc.exists()) {
        setAutomatedPlaylist(doc.data().tracks || []);
      }
    });

    return () => unsubscribe();
  }, []);

  const updatePlaylist = async (newPlaylist: Track[]) => {
    try {
      const playlistDocRef = doc(db, 'radio', 'automatedPlaylist');
      await setDoc(playlistDocRef, { tracks: newPlaylist });
      toast({
        title: 'Playlist Updated',
        description: 'Your automated playlist has been saved.',
      });
    } catch (error) {
      console.error('Error updating playlist: ', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'Could not update the playlist.',
      });
    }
  };

  const handleAddTrack = () => {
    if (!newTrackUrl || !newTrackTitle) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide both a title and a URL.',
      });
      return;
    }
    const newPlaylist = [
      ...automatedPlaylist,
      { title: newTrackTitle, url: newTrackUrl },
    ];
    updatePlaylist(newPlaylist);
    setNewTrackUrl('');
    setNewTrackTitle('');
  };

  const handleDeleteTrack = (index: number) => {
    const newPlaylist = automatedPlaylist.filter((_, i) => i !== index);
    updatePlaylist(newPlaylist);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    toast({
      title: 'Uploading Audio...',
      description: `Uploading "${file.name}". Please wait.`,
    });

    try {
      const storageRef = ref(storage, `radio_tracks/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const trackTitle = file.name.replace(/\.[^/.]+$/, ''); // Remove file extension
      const newPlaylist = [...automatedPlaylist, { title: trackTitle, url: downloadURL }];
      await updatePlaylist(newPlaylist);

      toast({
        title: 'Upload Complete!',
        description: `"${trackTitle}" has been added to the playlist.`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'There was an error uploading your file.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Radio Station Control Room
        </h1>
        <p className="text-muted-foreground">
          Manage your live broadcasts and automated playlist.
        </p>
      </div>

      <LiveControlPanel isRadio={true} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListMusic className="h-5 w-5 text-accent" />
            Automated Playlist
          </CardTitle>
          <CardDescription>
            This playlist runs when no live show is active.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
             <input
                type="file"
                accept="audio/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload & Add Audio Track'}
              </Button>
          </div>
          <div className="border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto">
            {automatedPlaylist.length > 0 ? (
              automatedPlaylist.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-secondary p-2 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Music className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {track.title}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTrack(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Your automated playlist is empty.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
