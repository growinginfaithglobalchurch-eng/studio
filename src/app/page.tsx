
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
  Church,
  Target,
  Gem,
  Rocket,
  ShieldCheck,
  BookMarked,
  Eye,
  UserCheck,
  Network,
  Sparkles,
  Swords,
  Globe,
  Zap,
  RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollAnimator } from '@/components/scroll-animator';
import { useLanguage } from '@/context/language-context';

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-accent" />,
      title: t('landingFeaturesTitle1'),
      description: t('landingFeaturesDesc1'),
      image: PlaceHolderImages.find(img => img.id === 'devotionals-feature'),
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: t('landingFeaturesTitle2'),
      description: t('landingFeaturesDesc2'),
      image: PlaceHolderImages.find(img => img.id === 'community-feature'),
    },
    {
      icon: <Rocket className="h-10 w-10 text-accent" />,
      title: t('landingFeaturesTitle3'),
      description: t('landingFeaturesDesc3'),
      image: PlaceHolderImages.find(img => img.id === 'prayer-feature'),
    },
  ];

  const values = [
      {
        icon: <Target className="h-8 w-8 text-accent" />,
        title: t('landingValuesTitle1'),
        description: t('landingValuesDesc1')
      },
      {
        icon: <Rocket className="h-8 w-8 text-accent" />,
        title: t('landingValuesTitle2'),
        description: t('landingValuesDesc2')
      },
      {
        icon: <Gem className="h-8 w-8 text-accent" />,
        title: t('landingValuesTitle3'),
        description: t('landingValuesDesc3')
      }
  ];

  const inEssencePoints = [
    {
      icon: <Network className="h-8 w-8 text-accent" />,
      key: 'landingEssenceTitle1',
      title: t('landingEssenceTitle1'),
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      key: 'landingEssenceTitle2',
      title: t('landingEssenceTitle2'),
    },
    {
      icon: <Swords className="h-8 w-8 text-accent" />,
      key: 'landingEssenceTitle3',
      title: t('landingEssenceTitle3'),
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      key: 'landingEssenceTitle4',
      title: t('landingEssenceTitle4'),
    },
  ];

  const leadershipPoints = [
      {
          icon: <ShieldCheck className="h-6 w-6 text-accent" />,
          title: t('landingLeadershipPoint1'),
      },
      {
          icon: <BookMarked className="h-6 w-6 text-accent" />,
          title: t('landingLeadershipPoint2'),
      },
      {
          icon: <Eye className="h-6 w-6 text-accent" />,
          title: t('landingLeadershipPoint3'),
      },
      {
          icon: <UserCheck className="h-6 w-6 text-accent" />,
          title: t('landingLeadershipPoint4'),
      }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Church className="h-8 w-8 text-accent" />
            <span className="text-lg font-headline font-bold text-foreground">
              Faith Connect Global
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">{t('getStarted')}</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative">
          <div className="container px-0 md:px-6">
            <AspectRatio ratio={16 / 9} className="relative">
              <Image
                src={PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || ''}
                alt="Congregation worshipping"
                fill
                className="object-cover md:rounded-lg"
                priority
                data-ai-hint="worship congregation"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="container px-4 md:px-6">
                  
                </div>
              </div>
            </AspectRatio>
          </div>
        </section>

        <section className="py-12 md:py-20 text-center bg-secondary">
            <div className="container px-4 md:px-6">
              <ScrollAnimator>
                <p className="text-accent tracking-wider text-4xl sm:text-5xl italic">{t('landingWelcomeTo')}</p>
                <h2 className="font-headline text-4xl font-bold tracking-wide sm:text-5xl text-card-foreground mt-2">
                    {t('landingYearOf')}
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                    {t('landingYearOfDesc')}
                </p>
                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-black">
                        <RefreshCw className="h-5 w-5 text-accent"/>
                        <span>{t('restoration')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-black">
                        <Zap className="h-5 w-5 text-accent"/>
                        <span>{t('acceleration')}</span>
                    </div>
                </div>
              </ScrollAnimator>
            </div>
        </section>
        
        <section id="features" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollAnimator>
              <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-accent">
                  {t('landingPlatformFor')}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  {t('landingPlatformForDesc')}
                </p>
              </div>
            </ScrollAnimator>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <ScrollAnimator key={index} delay={index * 0.1}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-card h-full">
                    <CardHeader className="flex flex-col items-center text-center p-6">
                      {feature.icon}
                      <CardTitle className="mt-4 font-headline font-bold text-card-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center px-6 pb-6">
                      <p className="text-card-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
             <ScrollAnimator>
              <div className="mb-12 text-center">
                  <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-card-foreground">
                    {t('landingCoreConvictions')}
                  </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                      {t('landingCoreConvictionsDesc')}
                    </p>
              </div>
            </ScrollAnimator>
            <div className="grid gap-8 md:grid-cols-3">
                {values.map((value, index) => (
                  <ScrollAnimator key={value.title} delay={index * 0.1}>
                    <Card className="bg-card p-6 text-center flex flex-col items-center h-full">
                         {value.icon}
                        <h3 className="text-xl font-bold text-card-foreground mt-4">{value.title}</h3>
                        <p className="text-muted-foreground mt-2 flex-grow">{value.description}</p>
                    </Card>
                  </ScrollAnimator>
                ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <ScrollAnimator>
              <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                  {t('inEssence')}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  {t('inEssenceDesc')}
                </p>
              </div>
            </ScrollAnimator>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {inEssencePoints.map((point, index) => (
                <ScrollAnimator key={point.key} delay={index * 0.1}>
                  <Card
                    className="bg-card p-6 text-center flex flex-col items-center h-full"
                  >
                    {point.icon}
                    <h3 className="text-lg font-bold text-card-foreground mt-4">
                      {point.title}
                    </h3>
                  </Card>
                </ScrollAnimator>
              ))}
            </div>
            <ScrollAnimator delay={0.4}>
              <p className="mt-12 text-center text-lg max-w-4xl mx-auto text-muted-foreground">
                {t('inEssenceFooter')}
              </p>
            </ScrollAnimator>
          </div>
        </section>

        <section id="founders" className="py-12 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <ScrollAnimator>
              <div className="mb-12 text-center">
                <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-card-foreground">
                  {t('meetFounders')}
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                  {t('meetFoundersDesc')}
                </p>
              </div>
            </ScrollAnimator>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                <ScrollAnimator delay={0.1}>
                  <Card className="flex flex-col items-center p-8 text-center bg-card">
                      <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                          <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl} alt="Joseph Tryson"/>
                          <AvatarFallback>JT</AvatarFallback>
                      </Avatar>
                      <h3 className="font-headline text-xl font-bold text-card-foreground">{t('founder1Name')}</h3>
                      <p className="mt-2 text-muted-foreground">{t('founder1Desc')}</p>
                  </Card>
                </ScrollAnimator>
                 <ScrollAnimator delay={0.2}>
                  <Card className="flex flex-col items-center p-8 text-center bg-card">
                      <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                          <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl} alt="Prophetess Norah Tryson"/>
                          <AvatarFallback>NT</AvatarFallback>
                      </Avatar>
                      <h3 className="font-headline text-xl font-bold text-card-foreground">{t('founder2Name')}</h3>
                      <p className="mt-2 text-muted-foreground">{t('founder2Desc')}</p>
                  </Card>
                </ScrollAnimator>
                <ScrollAnimator delay={0.3} className="lg:col-span-2 lg:row-start-1 lg:col-start-3">
                  <Card className="flex flex-col p-8 bg-card h-full">
                      <CardHeader className="p-0 text-center">
                          <CardTitle className="font-headline text-xl font-bold text-card-foreground">{t('leadershipCovering')}</CardTitle>
                          <CardDescription className="mt-2 text-muted-foreground">{t('leadershipCoveringDesc')}</CardDescription>
                      </CardHeader>
                      <CardContent className="mt-6">
                          <ul className="space-y-4">
                              {leadershipPoints.map((point) => (
                                  <li key={point.title} className="flex items-center gap-4">
                                      {point.icon}
                                      <span className="font-medium text-card-foreground">{point.title}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
                </ScrollAnimator>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-background text-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Faith Connect Global. {t('allRightsReserved')}
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline text-muted-foreground">
              {t('privacyPolicy')}
            </Link>
            <Link href="#" className="text-sm hover:underline text-muted-foreground">
              {t('termsOfService')}
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
