
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';

const chartData = [
  { activity: 'Devotionals', count: 12, fill: 'hsl(var(--chart-1))' },
  { activity: 'Prayers', count: 8, fill: 'hsl(var(--chart-2))' },
  { activity: 'Sessions', count: 5, fill: 'hsl(var(--chart-3))' },
  { activity: 'Connections', count: 3, fill: 'hsl(var(--chart-4))' },
];

const chartConfig = {
  count: {
    label: 'Count',
  },
  devotionals: {
    label: 'Devotionals',
    color: 'hsl(var(--chart-1))',
  },
  prayers: {
    label: 'Prayers',
    color: 'hsl(var(--chart-2))',
  },
  sessions: {
    label: 'Sessions',
    color: 'hsl(var(--chart-3))',
  },
  connections: {
    label: 'Connections',
    color: 'hsl(var(--chart-4))',
  },
};

export function SpiritualGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl text-accent font-bold">
              Your Growth Journey
            </CardTitle>
            <CardDescription className="text-white">
              Here is your spiritual growth journey at a glance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="activity"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
