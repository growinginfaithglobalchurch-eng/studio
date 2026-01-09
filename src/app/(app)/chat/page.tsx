import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <MessageCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Chat Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This feature is under construction. Soon you'll be able to connect and chat with other members of the community right here!</p>
            </CardContent>
        </Card>
    </div>
  )
}
