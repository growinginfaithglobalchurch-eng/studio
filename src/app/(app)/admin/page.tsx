import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Shield className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Admin Panel Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This section is for administrative purposes and is currently under construction.</p>
            </CardContent>
        </Card>
    </div>
  )
}
