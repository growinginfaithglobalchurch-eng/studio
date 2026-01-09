
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaintBrush } from 'lucide-react';

export default function AdminSettingsPage() {
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
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Controls for logo, colors, and fonts will be here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
