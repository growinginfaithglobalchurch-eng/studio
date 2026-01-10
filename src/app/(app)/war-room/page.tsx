
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function WarRoomPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">The War Room</CardTitle>
                <CardDescription>Strategic Command Center</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This portal for strategic spiritual warfare is currently under construction. Soon you will be able to join live prayer operations, receive targeted assignments, and engage in Courts of Heaven sessions right here.</p>
            </CardContent>
        </Card>
    </div>
  )
}
