
'use client';

import { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: Date;
}

export const Countdown = ({ targetDate }: CountdownProps) => {
    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        let timeLeft = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex justify-center gap-2 sm:gap-4">
            <div className="p-2 sm:p-4 bg-secondary rounded-lg text-center w-20 sm:w-24">
                <p className="text-2xl sm:text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
                <p className="text-xs text-muted-foreground">HOURS</p>
            </div>
            <div className="p-2 sm:p-4 bg-secondary rounded-lg text-center w-20 sm:w-24">
                <p className="text-2xl sm:text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
                <p className="text-xs text-muted-foreground">MINUTES</p>
            </div>
            <div className="p-2 sm:p-4 bg-secondary rounded-lg text-center w-20 sm:w-24">
                <p className="text-2xl sm:text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
                <p className="text-xs text-muted-foreground">SECONDS</p>
            </div>
        </div>
    );
};
