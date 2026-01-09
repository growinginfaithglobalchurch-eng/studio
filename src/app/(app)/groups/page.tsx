import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function GroupsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Users className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Groups Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This feature is under construction. Soon you'll be able to join and create groups to connect with like-minded believers!</p>
            </CardContent>
        </Card>
    </div>
  )
}
