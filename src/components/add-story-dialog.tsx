
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Camera, Video, Upload, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface AddStoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStoryDialog({ open, onOpenChange }: AddStoryDialogProps) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

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
    toast({
        title: "Story Uploaded!",
        description: "Your story has been successfully uploaded.",
      });
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Camera className="h-6 w-6 text-accent" />
            Add to Your Story
          </AlertDialogTitle>
          <AlertDialogDescription>
            Record a short video to share with your connections.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="aspect-video w-full bg-secondary rounded-md overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {isRecording && (
                <div className="absolute top-2 right-2 flex items-center gap-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                    REC
                </div>
            )}
        </div>

        {!hasCameraPermission && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access to use this feature.
              </AlertDescription>
            </Alert>
        )}

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRecord} disabled={!hasCameraPermission}>
            <Video className="mr-2 h-4 w-4" />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Button>
          <Button onClick={handleUpload} disabled={!hasCameraPermission}>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
