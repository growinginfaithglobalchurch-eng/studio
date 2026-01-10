
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function CertificatesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-3">
                    <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-4">Certificates & Feedback</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This section is under construction. Soon you'll be able to view your certificates and provide feedback here!</p>
            </CardContent>
        </Card>
    </div>
  )
}
