
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Paintbrush, Image as ImageIcon, Upload, GitBranch, FileImage, Wallpaper, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function AdminSettingsPage() {
    const { toast } = useToast();
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const logos = PlaceHolderImages.filter(image => image.imageHint?.includes('logo')).slice(0, 3);
    const banners = PlaceHolderImages.filter(image => image.id.includes('hero') || image.id.includes('banner')).slice(0, 4);

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveLogo = () => {
        setLogoFile(null);
        setLogoPreview(null);
    };

    const handleUploadLogo = () => {
        if (!logoFile) return;
        toast({
            title: "Logo Uploaded",
            description: `${logoFile.name} has been uploaded successfully.`,
        });
        handleRemoveLogo();
    };
    
    const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setBannerFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveBanner = () => {
        setBannerFile(null);
        setBannerPreview(null);
    };

    const handleUploadBanner = () => {
        if (!bannerFile) return;
        toast({
            title: "Branding Photo Uploaded",
            description: `${bannerFile.name} has been uploaded successfully.`,
        });
        handleRemoveBanner();
    };

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
              <Paintbrush className="h-5 w-5 text-accent" />
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
              Media & Branding Assets
            </CardTitle>
            <CardDescription>
                Manage logos, branding photos, banners, and background photos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
             
            <div>
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                    <FileImage className="h-5 w-5" />
                    Logos
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                    {logos.map((image) => (
                        <div key={image.id} className="relative aspect-square rounded-md overflow-hidden border bg-secondary/30 p-2">
                             <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-contain"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    ))}
                </div>
                 <div className="flex items-center justify-center w-full">
                    {!logoPreview ? (
                        <label htmlFor="logo-dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground"><span className="font-semibold">Upload a Logo</span></p>
                            </div>
                            <input id="logo-dropzone-file" type="file" className="hidden" onChange={handleLogoChange} accept="image/png, image/jpeg, image/svg+xml" />
                        </label>
                    ) : (
                        <div className="w-full">
                            <div className="relative w-full max-w-sm mx-auto h-32 rounded-lg border p-2">
                                <Image src={logoPreview} alt="Logo preview" fill className="object-contain" />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                    onClick={handleRemoveLogo}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex justify-center mt-4">
                                 <Button onClick={handleUploadLogo}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Logo
                                </Button>
                            </div>
                        </div>
                    )}
                </div> 
            </div>

            <div className="border-t pt-8">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                    <Wallpaper className="h-5 w-5" />
                    Banners & Backgrounds
                </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {banners.map((image) => (
                        <div key={image.id} className="relative aspect-video rounded-md overflow-hidden border">
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
                 <div className="flex items-center justify-center w-full">
                    {!bannerPreview ? (
                        <label htmlFor="banner-dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG (Recommended: 1920x1080)</p>
                            </div>
                            <input id="banner-dropzone-file" type="file" className="hidden" onChange={handleBannerChange} accept="image/png, image/jpeg, image/svg+xml" />
                        </label>
                    ) : (
                        <div className="w-full">
                            <div className="relative w-full max-w-lg mx-auto aspect-video rounded-lg border p-2">
                                <Image src={bannerPreview} alt="Banner preview" fill className="object-cover" />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                    onClick={handleRemoveBanner}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="flex justify-center mt-4">
                                 <Button onClick={handleUploadBanner}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Banner
                                </Button>
                            </div>
                        </div>
                    )}
                </div> 
            </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-accent" />
              Platform Roadmap & Strategy
            </CardTitle>
             <CardDescription>
                View the strategic roadmap for monetization, content, and features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
                <Link href="/admin/roadmap">View Roadmap</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
