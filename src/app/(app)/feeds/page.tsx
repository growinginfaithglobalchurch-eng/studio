import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss } from "lucide-react";

export default function FeedsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Rss className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Feeds Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This feature is under construction. Soon you'll be able to see a live feed of activity from across the community!</p>
            </CardContent>
        </Card>
    </div>
  )
}
