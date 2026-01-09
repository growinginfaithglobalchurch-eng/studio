
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PaintBrush, Image as ImageIcon, Upload } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AdminSettingsPage() {
    const uploadedImages = PlaceHolderImages.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your site's branding, theme, and content.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PaintBrush className="h-5 w-5 text-accent" />
              Theme & Branding
            </CardTitle>
             <CardDescription>
                Customize the look and feel of your platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Controls for logo, colors, and fonts will be here.
            </p>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-accent" />
              Media & Branding
            </CardTitle>
            <CardDescription>
                Manage logos, branding photos, banners, and background photos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 

            <div>
                <h3 className="text-lg font-medium text-foreground mb-4">Uploaded Assets</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {uploadedImages.map((image) => (
                        <div key={image.id} className="relative aspect-square rounded-md overflow-hidden border">
                             <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
