

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  BookOpen,
  Shield,
  HeartPulse,
  Swords,
  TrendingUp,
  Briefcase,
  Wind,
  Voicemail,
  Sparkles,
  User,
  Star,
  Quote,
  CheckCircle,
  BarChart,
  GitCompare,
  Server,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const coreSchools = [
  {
    icon: <Sparkles className="h-6 w-6 text-accent" />,
    title: 'School of Revelation',
    description: 'Unlocking the depths of God’s Word and the mysteries of His Kingdom.',
    href: '/school-of-revelation',
  },
  {
    icon: <Wind className="h-6 w-6 text-accent" />,
    title: 'School of the Spirit',
    description: 'Cultivating a life of intimacy, power, and partnership with the Holy Spirit.',
    href: '/school-of-the-spirit',
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-accent" />,
    title: 'School of Healing',
    description: 'Equipping believers to receive and minister God\'s healing power.',
    href: '/school-of-healing',
  },
  {
    icon: <Voicemail className="h-6 w-6 text-accent" />,
    title: 'School of the Prophet',
    description: 'Raising a generation that speaks the heart of God with clarity and power.',
    href: '/school-of-prophet',
  },
  {
    icon: <Swords className="h-6 w-6 text-accent" />,
    title: 'School of Deliverance',
    description: 'Equipping the saints to set the captives free and walk in total victory.',
    href: '/school-of-deliverance',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    title: 'School of Ministry',
    description: 'Equipping believers for effective service in every sphere of life.',
    href: '/school-of-ministry',
  },
   {
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    title: 'Business School',
    description: 'Equipping marketplace leaders and entrepreneurs for Kingdom impact.',
    href: '/business-school',
  },
    {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Bible Theology (All Levels)',
    description: 'A deep dive into systematic theology, biblical interpretation, and church history, activated at a professional and international level.',
    href: '/bible-theology',
  },
];

const studentTestimonials = [
    {
        name: communityUsers[1].name,
        avatar: communityUsers[1].avatar,
        level: 4,
        testimonial: "The School of the Prophet completely transformed how I hear God's voice. The mentorship I received was invaluable and has given me the confidence to step out in my calling."
    },
    {
        name: communityUsers[2].name,
        avatar: communityUsers[2].avatar,
        level: 3,
        testimonial: "I came in with a lot of questions and left with a solid foundation. The curriculum is challenging, biblically sound, and incredibly practical for everyday life."
    }
];

const curriculumLevels = [
    {
        level: "LEVEL 1: FOUNDATION SCHOOL",
        audience: "New Believers & Fresh Starters",
        goal: "Establish strong biblical foundations and identity in Christ.",
        duration: "8–12 weeks",
        courses: [
            "Salvation & New Creation Reality", "Knowing God & His Word", "Faith Basics (Hebrews 11)",
            "Prayer & Devotion Life", "Kingdom Citizenship", "Introduction to the Holy Spirit", "Bible Overview (Genesis–Revelation)"
        ],
        outcome: ["Strong identity in Christ", "Understanding of salvation", "Daily spiritual disciplines"],
        certificate: "Foundation Certificate in Faith"
    },
    {
        level: "LEVEL 2: GROWTH & DISCIPLESHIP SCHOOL",
        audience: "Spiritual Formation & Discipline",
        goal: "Develop spiritual habits, character, and Kingdom mindset.",
        duration: "12 weeks",
        courses: [
            "Word, Faith & Confession", "Hearing the Voice of God", "Kingdom Culture & Ethics",
            "Spiritual Authority & Obedience", "Fruit of the Spirit", "Basic Ministry Skills", "Stewardship & Accountability"
        ],
        outcome: ["Mature Christian conduct", "Strong prayer & Word life", "Submission to Kingdom order"],
        certificate: "Diploma in Christian Discipleship"
    },
    {
        level: "LEVEL 3: MINISTRY & LEADERSHIP SCHOOL",
        audience: "Equipping for Service",
        goal: "Train believers for ministry leadership and service.",
        duration: "3–6 months",
        courses: [
            "Fivefold Ministry (Ephesians 4)", "Leadership in the Kingdom", "Teaching & Preaching the Word",
            "Pastoral Care & Counseling", "Ministry Ethics & Protocols", "Kingdom Administration", "Church Growth & Evangelism"
        ],
        practicum: ["Supervised ministry service", "Departmental assignment"],
        outcome: ["Effective ministry leadership", "Spiritual and administrative competence"],
        certificate: "Advanced Diploma in Ministry & Leadership"
    },
    {
        level: "LEVEL 4: SPIRITUAL AUTHORITY & SUPERNATURAL SCHOOL",
        audience: "Power, Dominion & Realms",
        goal: "Activate believers in spiritual authority and Kingdom dominion.",
        duration: "3–4 months",
        courses: [
            "The Spirit Realm & Realms of Operation", "Spiritual Warfare & Strategy", "Courts of Heaven",
            "Prophetic Operations", "Healing, Deliverance & Miracles", "Identity, Authority & Dominion", "Discernment & Watchmanship"
        ],
        practicum: ["War Room sessions", "Prophetic Room participation"],
        outcome: ["Mature spiritual authority", "Accurate spiritual operations"],
        certificate: "Diploma in Spiritual Authority & Supernatural Ministry"
    },
    {
        level: "LEVEL 5: APOSTOLIC & KINGDOM GOVERNANCE SCHOOL",
        audience: "Rulers, Builders & Reformers",
        goal: "Train Kingdom governors for cities, nations, and systems.",
        duration: "6–12 months",
        courses: [
            "Apostolic Foundations", "Kingdom Governance & Systems", "Territorial Authority",
            "Reformation Theology", "Nation Building & Policy", "Strategic Intercession", "Mentorship & Legacy"
        ],
        practicum: ["Ministry, business, or nation-impact initiative (Capstone Project)"],
        outcome: ["Apostolic clarity", "Governmental authority", "Kingdom deployment"],
        certificate: "Apostolic Commission & Ordination (As Applicable)"
    }
];

const deliveryModes = [
    { icon: <Server className="h-6 w-6 text-accent" />, title: "Online (App / Web)" },
    { icon: <Users className="h-6 w-6 text-accent" />, title: "Physical Classroom" },
    { icon: <GitCompare className="h-6 w-6 text-accent" />, title: "Hybrid (Live + Recorded)" },
];

const assessmentMethods = [
    "Weekly quizzes", "Assignments", "Spiritual growth evaluation",
    "Practical ministry assessment", "Mentor approval"
];

const progressionRules = [
    "No level is skipped without approval", "Character precedes promotion",
    "Power without submission is prohibited", "Authority is granted by fruit, not gifting"
];


export default function BibleSchoolPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotionals-feature'
  );

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Growing In Faith Global Bible Institute
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Raising and equipping a generation that walks in the fullness of their identity and authority in Christ.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Enrollment Now Open</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Begin Your Transformational Journey
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Our institute is more than an academic exercise; it's a spiritual equipping center designed to activate your calling.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <Button size="lg" asChild>
                <Link href="/signup">Apply Now</Link>
              </Button>
            </CardContent>
          </div>
          {heroImage && (
            <div className="relative h-64 md:h-full w-full">
              <Image
                src={heroImage.imageUrl}
                alt="Bible Institute"
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </Card>
      
      <div>
        <h2 className="text-2xl font-headline font-bold mb-4 text-center">Curriculum Levels & Structure</h2>
        <Accordion type="single" collapsible className="w-full">
            {curriculumLevels.map((item, index) => (
                <AccordionItem value={`level-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-lg font-headline hover:no-underline">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1">
                             <span>{item.level}</span>
                             <span className="text-sm font-normal text-muted-foreground">{item.audience}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-card/30 rounded-md">
                       <div className="space-y-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-2 rounded bg-secondary">
                                    <p className="text-xs text-muted-foreground">Goal</p>
                                    <p className="text-sm font-semibold">{item.goal}</p>
                                </div>
                                 <div className="p-2 rounded bg-secondary">
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="text-sm font-semibold">{item.duration}</p>
                                </div>
                                <div className="p-2 rounded bg-secondary col-span-2">
                                    <p className="text-xs text-muted-foreground">Certificate</p>
                                    <p className="text-sm font-semibold">{item.certificate}</p>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Courses:</h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                                    {item.courses.map(course => <li key={course} className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> {course}</li>)}
                                </ul>
                            </div>
                            
                            {item.practicum && (
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Practicum:</h4>
                                    <ul className="text-sm text-muted-foreground list-disc pl-5">
                                        {item.practicum.map(p => <li key={p}>{p}</li>)}
                                    </ul>
                                </div>
                            )}

                             <div>
                                <h4 className="font-semibold text-foreground mb-2">Outcome:</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                    {item.outcome.map(o => <li key={o}>{o}</li>)}
                                </ul>
                            </div>
                       </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/>Curriculum Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-foreground">Levels 1-5</h3>
                    <p className="text-sm text-muted-foreground">Progress through foundational to advanced levels of spiritual truth and practical ministry.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Mentorship</h3>
                    <p className="text-sm text-muted-foreground">Each student is assigned a mentor for personal guidance, accountability, and impartation.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Assessments & Activation</h3>
                    <p className="text-sm text-muted-foreground">Practical assignments and quizzes ensure comprehension, leading to real-world activation of your gifts.</p>
                </div>
            </CardContent>
        </Card>
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-bold mb-4">Core Schools of the Institute</h2>
            <div className="grid gap-6 md:grid-cols-2">
            {coreSchools.map((school) => (
                <Card key={school.title} className="hover:bg-secondary/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        {school.icon}
                        <CardTitle className="text-lg font-headline">{school.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Button variant="outline" asChild>
                        <Link href={school.href}>Learn More</Link>
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        </div>
      </div>
      
       <div className="grid gap-8 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Server className="h-5 w-5 text-accent"/>Delivery Modes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {deliveryModes.map(mode => (
                        <div key={mode.title} className="flex items-center gap-3">
                            {mode.icon}
                            <p className="font-semibold">{mode.title}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-accent"/>Assessment & Promotion</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {assessmentMethods.map(method => <li key={method}>{method}</li>)}
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCompare className="h-5 w-5 text-accent"/>Student Progression Rules</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {progressionRules.map(rule => <li key={rule}>{rule}</li>)}
                    </ul>
                </CardContent>
            </Card>
       </div>
      
       <div>
            <h2 className="text-2xl font-headline font-bold mb-4 text-center">Student Testimonials</h2>
            <div className="grid gap-8 md:grid-cols-2">
                {studentTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card">
                        <CardContent className="pt-6">
                            <div className="flex gap-4">
                                <Avatar className="w-16 h-16 border-2 border-accent">
                                    <AvatarImage src={testimonial.avatar?.imageUrl} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-lg font-bold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">Level {testimonial.level} Student</p>
                                </div>
                            </div>
                            <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted-foreground">
                                "{testimonial.testimonial}"
                            </blockquote>
                        </CardContent>
                    </Card>
                ))}
            </div>
       </div>

    </div>
  );
}
