

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollAnimator } from "@/components/scroll-animator";

export default function FriendsPage() {
  return (
    <ScrollAnimator>
      <div className="flex flex-col items-center justify-center h-full text-center py-10">
          <Card className="w-full max-w-md">
              <CardHeader>
                  <div className="mx-auto bg-muted rounded-full p-3">
                      <Users className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="mt-4">Your Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <p className="text-muted-foreground">This page has been integrated into the "Connect" page. Please use the "Friends" tab there to see your connections.</p>
                  <Button asChild>
                      <Link href="/connect">Go to Connections</Link>
                  </Button>
              </CardContent>
          </Card>
      </div>
    </ScrollAnimator>
  )
}
