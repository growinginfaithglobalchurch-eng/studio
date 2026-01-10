'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const readingPlan = [
    { month: "January", readings: ["Genesis 1-3", "Genesis 4-6", "Genesis 7-9", "Genesis 10-12", "Genesis 13-15", "Genesis 16-18", "Genesis 19-21", "Genesis 22-24", "Genesis 25-27", "Genesis 28-30", "Genesis 31-33", "Genesis 34-36", "Genesis 37-39", "Genesis 40-42", "Genesis 43-45", "Genesis 46-48", "Genesis 49-50", "Exodus 1-3", "Exodus 4-6", "Exodus 7-9", "Exodus 10-12", "Exodus 13-15", "Exodus 16-18", "Exodus 19-21", "Exodus 22-24", "Exodus 25-27", "Exodus 28-30", "Exodus 31-33", "Exodus 34-36", "Exodus 37-39", "Exodus 40"] },
    { month: "February", readings: ["Leviticus 1-4", "Leviticus 5-7", "Leviticus 8-10", "Leviticus 11-13", "Leviticus 14-16", "Leviticus 17-19", "Leviticus 20-22", "Leviticus 23-25", "Leviticus 26-27", "Numbers 1-3", "Numbers 4-6", "Numbers 7-9", "Numbers 10-12", "Numbers 13-15", "Numbers 16-18", "Numbers 19-21", "Numbers 22-24", "Numbers 25-27", "Numbers 28-30", "Numbers 31-33", "Numbers 34-36", "Deuteronomy 1-3", "Deuteronomy 4-6", "Deuteronomy 7-9", "Deuteronomy 10-12", "Deuteronomy 13-15", "Deuteronomy 16-18", "Deuteronomy 19-21"] },
    { month: "March", readings: ["Deuteronomy 22-24", "Deuteronomy 25-27", "Deuteronomy 28-30", "Deuteronomy 31-34", "Joshua 1-4", "Joshua 5-8", "Joshua 9-12", "Joshua 13-16", "Joshua 17-20", "Joshua 21-24", "Judges 1-4", "Judges 5-8", "Judges 9-12", "Judges 13-16", "Judges 17-21", "Ruth 1-4", "1 Samuel 1-4", "1 Samuel 5-8", "1 Samuel 9-12", "1 Samuel 13-16", "1 Samuel 17-20", "1 Samuel 21-24", "1 Samuel 25-28", "1 Samuel 29-31", "2 Samuel 1-4", "2 Samuel 5-8", "2 Samuel 9-12", "2 Samuel 13-16", "2 Samuel 17-20", "2 Samuel 21-24", "1 Kings 1-3"] },
    { month: "April", readings: ["1 Kings 4-7", "1 Kings 8-11", "1 Kings 12-15", "1 Kings 16-19", "1 Kings 20-22", "2 Kings 1-4", "2 Kings 5-8", "2 Kings 9-12", "2 Kings 13-16", "2 Kings 17-20", "2 Kings 21-25", "1 Chronicles 1-4", "1 Chronicles 5-8", "1 Chronicles 9-12", "1 Chronicles 13-16", "1 Chronicles 17-20", "1 Chronicles 21-24", "1 Chronicles 25-29", "2 Chronicles 1-5", "2 Chronicles 6-9", "2 Chronicles 10-13", "2 Chronicles 14-17", "2 Chronicles 18-21", "2 Chronicles 22-25", "2 Chronicles 26-29", "2 Chronicles 30-33", "2 Chronicles 34-36", "Ezra 1-4", "Ezra 5-8", "Ezra 9-10"] },
    { month: "May", readings: ["Nehemiah 1-4", "Nehemiah 5-8", "Nehemiah 9-11", "Nehemiah 12-13", "Esther 1-5", "Esther 6-10", "Job 1-5", "Job 6-10", "Job 11-15", "Job 16-20", "Job 21-25", "Job 26-30", "Job 31-35", "Job 36-40", "Job 41-42", "Psalms 1-10", "Psalms 11-20", "Psalms 21-30", "Psalms 31-40", "Psalms 41-50", "Psalms 51-60", "Psalms 61-70", "Psalms 71-80", "Psalms 81-90", "Psalms 91-100", "Psalms 101-110", "Psalms 111-119", "Psalms 120-130", "Psalms 131-140", "Psalms 141-150", "Proverbs 1-5"] },
    { month: "June", readings: ["Proverbs 6-10", "Proverbs 11-15", "Proverbs 16-20", "Proverbs 21-25", "Proverbs 26-31", "Ecclesiastes 1-6", "Ecclesiastes 7-12", "Song of Solomon 1-8", "Isaiah 1-6", "Isaiah 7-12", "Isaiah 13-18", "Isaiah 19-24", "Isaiah 25-30", "Isaiah 31-36", "Isaiah 37-42", "Isaiah 43-48", "Isaiah 49-54", "Isaiah 55-60", "Isaiah 61-66", "Jeremiah 1-6", "Jeremiah 7-12", "Jeremiah 13-18", "Jeremiah 19-24", "Jeremiah 25-30", "Jeremiah 31-36", "Jeremiah 37-42", "Jeremiah 43-48", "Jeremiah 49-52", "Lamentations 1-5", "Ezekiel 1-6"] },
    { month: "July", readings: ["Ezekiel 7-12", "Ezekiel 13-18", "Ezekiel 19-24", "Ezekiel 25-30", "Ezekiel 31-36", "Ezekiel 37-42", "Ezekiel 43-48", "Daniel 1-6", "Daniel 7-12", "Hosea 1-7", "Hosea 8-14", "Joel 1-3", "Amos 1-9", "Obadiah 1", "Jonah 1-4", "Micah 1-7", "Nahum 1-3", "Habakkuk 1-3", "Zephaniah 1-3", "Haggai 1-2", "Zechariah 1-7", "Zechariah 8-14", "Malachi 1-4", "Matthew 1-7", "Matthew 8-12", "Matthew 13-18", "Matthew 19-24", "Matthew 25-28", "Mark 1-8", "Mark 9-16", "Luke 1-6"] },
    { month: "August", readings: ["Luke 7-11", "Luke 12-17", "Luke 18-24", "John 1-7", "John 8-14", "John 15-21", "Acts 1-7", "Acts 8-14", "Acts 15-21", "Acts 22-28", "Romans 1-8", "Romans 9-16", "1 Corinthians 1-8", "1 Corinthians 9-16", "2 Corinthians 1-7", "2 Corinthians 8-13", "Galatians 1-6", "Ephesians 1-6", "Philippians 1-4", "Colossians 1-4", "1 Thessalonians 1-5", "2 Thessalonians 1-3", "1 Timothy 1-6", "2 Timothy 1-4", "Titus 1-3", "Philemon 1", "Hebrews 1-7", "Hebrews 8-13", "James 1-5", "1 Peter 1-5", "2 Peter 1-3"] },
    { month: "September", readings: ["1 John 1-5", "2 John 1", "3 John 1", "Jude 1", "Revelation 1-7", "Revelation 8-14", "Revelation 15-22", "Psalms 1-5", "Psalms 6-10", "Psalms 11-15", "Psalms 16-20", "Psalms 21-25", "Psalms 26-30", "Psalms 31-35", "Psalms 36-40", "Psalms 41-45", "Psalms 46-50", "Psalms 51-55", "Psalms 56-60", "Psalms 61-65", "Psalms 66-70", "Psalms 71-75", "Psalms 76-80", "Psalms 81-85", "Psalms 86-90", "Psalms 91-95", "Psalms 96-100", "Psalms 101-105", "Psalms 106-110", "Psalms 111-115"] },
    { month: "October", readings: ["Psalms 116-119", "Psalms 120-125", "Psalms 126-130", "Psalms 131-135", "Psalms 136-140", "Psalms 141-145", "Psalms 146-150", "Proverbs 1-3", "Proverbs 4-6", "Proverbs 7-9", "Proverbs 10-12", "Proverbs 13-15", "Proverbs 16-18", "Proverbs 19-21", "Proverbs 22-24", "Proverbs 25-27", "Proverbs 28-31", "Isaiah 1-5", "Isaiah 6-10", "Isaiah 11-15", "Isaiah 16-20", "Isaiah 21-25", "Isaiah 26-30", "Isaiah 31-35", "Isaiah 36-40", "Isaiah 41-45", "Isaiah 46-50", "Isaiah 51-55", "Isaiah 56-60", "Isaiah 61-66", "Matthew 1-7"] },
    { month: "November", readings: ["Matthew 8-14", "Matthew 15-21", "Matthew 22-28", "John 1-7", "John 8-14", "John 15-21", "Romans 1-8", "Romans 9-16", "Ephesians 1-6", "Philippians 1-4", "Hebrews 1-7", "Hebrews 8-13", "Genesis 1-11", "Genesis 12-25", "Genesis 26-36", "Genesis 37-50", "Exodus 1-14", "Exodus 15-24", "Exodus 25-31", "Exodus 32-40", "Leviticus 1-10", "Leviticus 11-18", "Leviticus 19-27", "Numbers 1-10", "Numbers 11-21", "Numbers 22-36", "Deuteronomy 1-11", "Deuteronomy 12-26", "Deuteronomy 27-34", "Joshua 1-12"] },
    { month: "December", readings: ["Joshua 13-24", "Judges 1-12", "Judges 13-21", "Ruth 1-4", "1 Samuel 1-15", "1 Samuel 16-31", "2 Samuel 1-12", "2 Samuel 13-24", "1 Kings 1-11", "1 Kings 12-22", "2 Kings 1-13", "2 Kings 14-25", "Isaiah 9, 11, 53", "Micah 5", "Matthew 1-2", "Luke 1-2", "John 1", "Psalms 110, 118, 121", "Proverbs 30-31", "Revelation 1-3", "Revelation 4-8", "Revelation 9-13", "Revelation 14-18", "Revelation 19-22", "Malachi 1-4", "A day of reflection", "A day of thanksgiving", "A day of prayer for the new year"] }
];


export default function BibleReadingPlanPage() {
    const { toast } = useToast();

    const handleMarkAsComplete = (month: string, day: number) => {
        toast({
            title: "Day Complete!",
            description: `You've completed Day ${day} for ${month}. Keep up the great work!`,
        });
    }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <BookMarked className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Yearly Bible Reading Plan</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Engage with the entire counsel of God's Word through this structured year-long reading plan.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Reading Schedule</CardTitle>
            <CardDescription>Select a month to view the daily reading assignments.</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {readingPlan.map(item => (
                    <AccordionItem value={item.month} key={item.month}>
                        <AccordionTrigger className="text-lg font-headline">{item.month}</AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-3">
                             {item.readings.map((reading, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary/50">
                                    <p className="font-semibold text-foreground">Day {index + 1}: <span className="font-normal text-muted-foreground">{reading}</span></p>
                                    <Button size="sm" variant="ghost" onClick={() => handleMarkAsComplete(item.month, index + 1)}>
                                        <CheckCircle className="h-5 w-5 text-muted-foreground hover:text-green-500" />
                                    </Button>
                                </div>
                             ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
