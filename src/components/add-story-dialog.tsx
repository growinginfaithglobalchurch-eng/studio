
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Camera, Video, Upload, AlertCircle, Music, FileImage } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStoryDialog({ open, onOpenChange }: AddStoryDialogProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<string>('');

  const photoInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const getCameraPermission = async () => {
        if (!open) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Access Denied',
                description: 'Please enable camera permissions in your browser settings to use this app.',
            });
        }
    };
    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
}, [open, toast]);


  const handleRecord = () => {
    setIsRecording(!isRecording);
    // Recording logic would go here
  };
  
  const handleUpload = () => {
    if (!photo && !isRecording) {
      toast({
        variant: 'destructive',
        title: 'No Content to Upload',
        description: 'Please upload a photo or record a video first.',
      });
      return;
    }
    toast({
        title: "Story Uploaded!",
        description: "Your story has been successfully uploaded.",
      });
    setPhoto(null);
    setPhotoPreview(null);
    setSelectedAudio('');
    onOpenChange(false);
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setSelectedAudio('');
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-accent" />
            Add to Your Story
          </AlertDialogTitle>
          <AlertDialogDescription>
            Record a short video or upload a photo to share with your connections.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="aspect-video w-full bg-secondary rounded-md overflow-hidden relative">
            {photoPreview ? (
              <Image src={photoPreview} alt="Story preview" fill className="object-cover" />
            ) : (
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            )}
            {isRecording && (
                <div className="absolute top-2 right-2 flex items-center gap-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                    REC
                </div>
            )}
        </div>

        {!hasCameraPermission && !photoPreview && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Camera access is needed to record video stories. You can still upload a photo.
              </AlertDescription>
            </Alert>
        )}

        <div className="space-y-4">
          <input type="file" ref={photoInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
          <Button variant="outline" className="w-full" onClick={() => photoInputRef.current?.click()}>
            <FileImage className="mr-2 h-4 w-4" />
            {photo ? "Change Photo" : "Upload Photo"}
          </Button>

          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-muted-foreground" />
            <Select onValueChange={setSelectedAudio} value={selectedAudio}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Add Audio (Optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="/audio/worship.mp3">Worship</SelectItem>
                <SelectItem value="/audio/praise.mp3">Praise</SelectItem>
                <SelectItem value="/audio/prayer.mp3">Prayer</SelectItem>
                <SelectItem value="/audio/declaration.mp3">Declaration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleRecord} disabled={!hasCameraPermission || !!photo}>
            <Video className="mr-2 h-4 w-4" />
            {isRecording ? 'Stop Recording' : 'Record Video'}
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Story
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
