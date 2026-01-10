
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Gift } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const questions = [
  { id: 1, text: "I enjoy organizing people and resources to achieve a common goal.", gift: "Administration" },
  { id: 2, text: "I am moved with compassion to help those who are hurting.", gift: "Mercy" },
  { id: 3, text: "I find it natural to explain biblical truths in a way that others can easily understand.", gift: "Teaching" },
  { id: 4, text: "I often have a sense of what God is wanting to do in a particular situation.", gift: "Prophecy" },
  { id: 5, text: "I am energized by meeting new people and making them feel welcome.", gift: "Hospitality" },
  { id: 6, text: "I am a generous giver and look for opportunities to support God's work financially.", gift: "Giving" },
  { id: 7, text: "I am confident in God's power and promises, even when circumstances are difficult.", gift: "Faith" },
  { id: 8, text: "I enjoy providing practical help and support to others behind the scenes.", gift: "Service" },
  { id: 9, text: "I feel a strong desire to lead and guide others in their spiritual journey.", gift: "Leadership" },
  { id: 10, text: "I am able to clearly communicate a message from God to His people.", gift: "Prophecy" },
  { id: 11, text: "I have a strong desire to see people come to know Jesus and share my faith with them.", gift: "Evangelism" },
  { id: 12, text: "I find myself praying for extended periods for the needs of others and the church.", gift: "Intercession" },
  { id: 13, text: "I enjoy leading others in worship, whether through music or other arts.", gift: "Worship" },
  { id: 14, text: "I am skilled in working with my hands on practical projects like repairs or building.", gift: "Craftsmanship" },
  { id: 15, text: "I can often see through confusion and offer wise, biblically-sound advice.", gift: "Wisdom" },
];

const giftDescriptions = {
  Administration: "The divine ability to organize, manage, and coordinate to achieve ministry goals. This is vital for our Administration, Departmental Leadership, and Event Planning.",
  Mercy: "The divine ability to feel and show deep compassion, ministering to those who are suffering. A key gift for our Hospitality and Care teams.",
  Teaching: "The divine ability to clearly and effectively communicate God's Word, making it understandable and applicable. Essential for our Courses, Discipleship, and Kids & Youth ministries.",
  Prophecy: "The divine ability to receive and communicate an immediate message from God to His people for their edification, exhortation, and comfort. Used in our Prophetic and Intercessory teams.",
  Hospitality: "The divine ability to make others feel welcome, valued, and comfortable. This is the heart of our Ushering and Hospitality departments.",
  Giving: "The divine ability to contribute material resources to the work of the Lord with liberality and cheerfulness. This supports all ministry operations.",
  Faith: "The divine ability to envision what God wants to do and trust Him for the outcome, regardless of circumstances. A foundational gift for all pioneering ministry efforts.",
  Service: "The divine ability to identify and meet the practical needs of others, often behind the scenes. Crucial for our Sanctuary Maintenance and Media support teams.",
  Leadership: "The divine ability to inspire, motivate, and guide others to accomplish God's purposes. This is key for Life Group leaders and all ministry department heads.",
  Evangelism: "The divine ability to effectively share the gospel with unbelievers, leading them to faith in Jesus Christ. A core part of our Outreach Teams.",
  Intercession: "The divine ability to stand in the gap and pray for extended times on behalf of others and for God's purposes to be fulfilled. The engine room of our Intercessory department.",
  Worship: "The divine ability to lead the congregation into God's presence through music, singing, and other arts. The foundation of our Praise & Worship and Music departments.",
  Craftsmanship: "The divine ability to use hands-on skills in building, maintenance, and creative arts to serve the church and glorify God. Essential for our Sanctuary Maintenance and Media teams.",
  Wisdom: "The divine ability to apply spiritual knowledge effectively and to offer divinely-given solutions to complex problems. A valuable gift in leadership and mentorship.",
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
      .slice(0, 3)
      .filter(([, score]) => score > 0);
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
              <p className={cn("text-lg mb-6", currentQuestionIndex === 0 ? "text-black" : "text-foreground")}>{questions[currentQuestionIndex].text}</p>
              <div className="flex gap-4">
                <Button size="lg" className="w-full" onClick={() => handleAnswer('yes')}>Yes</Button>
                <Button size="lg" variant="outline" className="w-full text-white" onClick={() => handleAnswer('no')}>No</Button>
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
              {getTopGifts().length > 0 ? getTopGifts().map(([gift, score]) => (
                <Card key={gift} className="bg-secondary/50 p-4">
                  <h3 className="font-bold text-xl text-accent">{gift}</h3>
                  <p className="text-muted-foreground mt-1">{(giftDescriptions as any)[gift]}</p>
                </Card>
              )) : (
                <p className="text-muted-foreground text-center py-4">No dominant gifts identified. Try retaking the assessment and reflecting on where you feel most drawn to serve.</p>
              )}
              <div className="pt-4">
                <h4 className="font-semibold text-foreground">Next Steps:</h4>
                <ul className="list-disc pl-5 mt-2 text-muted-foreground space-y-1">
                  <li>Pray and ask God to confirm these gifts in your heart.</li>
                  <li>Talk to a pastor or mentor about what you've discovered.</li>
                  <li>Explore ministry opportunities where you can use these gifts by visiting the <Button variant="link" asChild className="p-0"><a href="/departments">Departments</a></Button> page.</li>
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
