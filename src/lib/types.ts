

import type { ImagePlaceholder } from './placeholder-images';

export type UserProfile = {
  fullName: string;
  email: string;
  phone?: string;
  dateJoined: any; // Using `any` for timestamp flexibility (e.g., Firebase Timestamp)
  photoURL?: string;
  location?: string; // Kept from old model, seems useful
};

export type KingdomCitizenship = {
  status: 'Active' | 'Suspended' | 'Revoked';
  dateAccepted: any;
  allegianceDeclared: boolean;
};

export type KingdomID = {
  kingdomIDNumber: string;
  authorityLevel: 1 | 2 | 3 | 4 | 5;
  tribe: 'Eagle' | 'Lion' | 'Marine' | 'All';
  issuedDate: any;
  badge: string;
};

export type Authority = {
  tier: number;
  title: string;
  unlockedDate: any;
  reviewedBy: string;
  status: 'Active' | 'Pending' | 'Inactive';
};

export type DailyPractices = {
  alignment: boolean;
  wordIntake: boolean;
  identity: boolean;
  speech: boolean;
  obedience: boolean;
  warfareReadiness: boolean;
  review: boolean;
  streakCount: number;
};

export type Declaration = {
  date: any;
  completed: boolean;
  identityDeclaration: boolean;
  authorityDeclaration: boolean;
  alignmentDeclaration: boolean;
};

export type CalendarEvent = {
  type: string;
  description: string;
  startDate: any;
  endDate: any;
  global: boolean;
  assignedUsers: string[];
};

export type GrowthMetrics = {
  consistencyScore: number;
  readinessLevel: string;
  authorityEligibility: boolean;
};

export type KidsProfile = {
  guardianApproved: boolean;
  ageGroup: string;
  dailyPracticeCompletion: number; // Assuming percentage
  streakCount: number;
};

export type FamilyPractices = {
    prayerMoments: boolean;
    scriptureDiscussion: boolean;
    blessingDeclarations: boolean;
};

export type FamilyGroup = {
    id: number;
    members: {
        fatherId: number;
        motherId: number;
        childrenIds: number[];
    };
    familyPractices: FamilyPractices;
    monthlyFocus: string;
    unityScore: 'Active' | 'Inactive';
};

// This replaces the previous simple User type
export type User = {
  id: number;
  profile?: UserProfile;
  kingdomCitizenship?: KingdomCitizenship;
  kingdomID?: KingdomID;
  authority?: Authority;
  dailyPractices?: DailyPractices;
  declarations?: Declaration[];
  calendarEvents?: CalendarEvent[];
  growthMetrics?: GrowthMetrics;
  familyGroup?: FamilyGroup;
  kidsProfile?: KidsProfile;
  avatar?: ImagePlaceholder; // Keeping this for UI consistency
  location: string; // from old model
  name: string; // from old model
  isFriend: boolean;
};
