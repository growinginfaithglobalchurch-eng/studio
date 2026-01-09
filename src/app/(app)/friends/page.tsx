
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function FriendsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Friends Page Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This section is under construction. Soon you'll be able to see your friends and their activity here!</p>
            </CardContent>
        </Card>
    </div>
  )
}
