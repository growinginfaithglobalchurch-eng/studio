
'use client';

import { useState, useEffect } from 'react';

export const Countdown = () => {
    const calculateTimeLeft = () => {
        // This is a placeholder. In a real app, you'd calculate from an end time.
        const difference = +new Date("2024-08-01T00:45:23") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
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

    const timerComponents: JSX.Element[] = [];

    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval as keyof typeof timeLeft]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
            </span>
        );
    });

    return (
        <span className="text-sm font-mono text-destructive">
            Ends in: {timerComponents.length ? timerComponents.reduce((prev, curr) => <>{prev}:{curr}</>) : <span>00:00</span>}
        </span>
    );
};
