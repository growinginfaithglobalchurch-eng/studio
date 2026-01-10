
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const questions = [
  { id: 1, text: "I enjoy organizing people and resources to achieve a common goal.", gift: "Administration" },
  { id: 2, text: "I am moved with compassion to help those who are hurting.", gift: "Mercy" },
  { id: 3, text: "I find it natural to explain biblical truths in a way that others can easily understand.", gift: "Teaching" },
  { id: 4, text: "I often have a sense of what God is wanting to do in a particular situation.", gift: "Prophecy" },
  { id: 5, text: "I am energized by meeting new people and making them feel welcome.", gift: "Hospitality" },
  { id: 6, text: "I am a generous giver and look for opportunities to support God's work financially.", gift: "Giving" },
  { id: 7, text: "I am confident in God's power and promises, even when circumstances are difficult.", gift: "Faith" },
  { id: 8, text: "I enjoy providing practical help and support to others.", gift: "Service" },
  { id: 9, text: "I feel a strong desire to lead and guide others in their spiritual journey.", gift: "Leadership" },
  { id: 10, text: "I am able to clearly communicate a message from God to His people.", gift: "Prophecy" },
];

const giftDescriptions = {
  Administration: "The divine ability to organize, manage, and coordinate to achieve ministry goals.",
  Mercy: "The divine ability to feel and show compassion to those who are suffering.",
  Teaching: "The divine ability to clearly and effectively communicate God's Word.",
  Prophecy: "The divine ability to receive and communicate an immediate message from God.",
  Hospitality: "The divine ability to make others feel welcome, valued, and comfortable.",
  Giving: "The divine ability to contribute material resources to the work of the Lord with liberality and cheerfulness.",
  Faith: "The divine ability to envision what God wants to do and trust Him for the outcome, regardless of circumstances.",
  Service: "The divine ability to identify and meet the practical needs of others.",
  Leadership: "The divine ability to inspire, motivate, and guide others to accomplish God's purposes.",
};

type Scores = { [key: string]: number };

export default function SpiritualGiftsAssessmentPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (value: string) => {
    const question = questions[currentQuestionIndex];
    if (value === "yes") {
      setScores(prev => ({
        ...prev,
        [question.gift]: (prev[question.gift] || 0) + 1,
      }));
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const getTopGifts = () => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Gift className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Spiritual Gifts Assessment</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Discover how God has uniquely equipped you to serve His kingdom.
        </p>
      </div>

      <Card>
        {!completed ? (
          <>
            <CardHeader>
              <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6 text-foreground">{questions[currentQuestionIndex].text}</p>
              <div className="flex gap-4">
                <Button size="lg" className="w-full" onClick={() => handleAnswer('yes')}>Yes</Button>
                <Button size="lg" variant="outline" className="w-full" onClick={() => handleAnswer('no')}>No</Button>
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="h-6 w-6 text-green-500" />
                Assessment Complete!
              </CardTitle>
              <CardDescription>
                Based on your responses, here are your top potential spiritual gifts. Remember, this is a starting point for prayer and exploration!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getTopGifts().map(([gift, score]) => (
                <Card key={gift} className="bg-secondary/50 p-4">
                  <h3 className="font-bold text-xl text-accent">{gift}</h3>
                  <p className="text-muted-foreground mt-1">{(giftDescriptions as any)[gift]}</p>
                </Card>
              ))}
              <div className="pt-4">
                <h4 className="font-semibold text-foreground">Next Steps:</h4>
                <ul className="list-disc pl-5 mt-2 text-muted-foreground space-y-1">
                  <li>Pray and ask God to confirm these gifts in your heart.</li>
                  <li>Talk to a pastor or mentor about what you've discovered.</li>
                  <li>Explore ministry opportunities where you can use these gifts.</li>
                </ul>
              </div>
              <Button className="mt-6" onClick={() => { setCompleted(false); setCurrentQuestionIndex(0); setScores({}); }}>
                Retake Assessment
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
