
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit } from 'lucide-react';

// In a real app, this would come from an auth context
const user = {
  name: 'Joseph',
  email: 'joseph@faithconnect.com',
  avatar: PlaceHolderImages.find((p) => p.id === 'avatar-1'),
  profile: {
    faithInterests: 'Prophecy, Worship, Leadership',
    growthGoals: 'Read the bible daily, Join a small group',
    ministryCalling: 'Teaching',
    spiritualMaturity: 'Mature Leader',
  },
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">
          Spiritual Profile
        </h1>
        <p className="text-muted-foreground">
          Tell us about your journey. This helps us personalize your experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {user.avatar && (
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar.imageUrl}
                  alt={user.name}
                  data-ai-hint={user.avatar.imageHint}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
            <Button variant="outline" size="icon" className="ml-auto">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="faith-interests">Faith Interests</Label>
              <Textarea
                id="faith-interests"
                placeholder="e.g., Prophecy, Worship, Apologetics"
                defaultValue={user.profile.faithInterests}
              />
              <p className="text-xs text-muted-foreground">
                Topics you're passionate about.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="growth-goals">Growth Goals</Label>
              <Textarea
                id="growth-goals"
                placeholder="e.g., Read the Bible daily, Join a small group"
                defaultValue={user.profile.growthGoals}
              />
              <p className="text-xs text-muted-foreground">
                What are you aiming for in your spiritual walk?
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ministry-calling">Ministry Calling</Label>
              <Input
                id="ministry-calling"
                placeholder="e.g., Teaching, Missions, Youth"
                defaultValue={user.profile.ministryCalling}
              />
              <p className="text-xs text-muted-foreground">
                How do you feel called to serve? (Optional)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="spiritual-maturity">
                Level of Spiritual Maturity
              </Label>
              <Select
                defaultValue={user.profile.spiritualMaturity}
              >
                <SelectTrigger id="spiritual-maturity">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New Believer">New Believer</SelectItem>
                  <SelectItem value="Growing Disciple">
                    Growing Disciple
                  </SelectItem>
                  <SelectItem value="Mature Leader">Mature Leader</SelectItem>
                  <SelectItem value="Seasoned Saint">
                    Seasoned Saint
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps us recommend appropriate resources.
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
