// src/components/Counter.tsx

import React, { useState, useEffect } from 'react';

const Counter: React.FC<{ onSave: (count: number, start: Date, end: Date) => void }> = ({ onSave }) => {
    const [counter, setCounter] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const startCounter = () => {
        setIsRunning(true);
        const start = new Date();
        setStartTime(start);
    };

    const stopCounter = () => {
        setIsRunning(false);
        const end = new Date();
        setEndTime(end);
    };


    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (isRunning) {
            timer = setInterval(() => {
                setCounter((prevCounter) => prevCounter + 1);
            }, 1000);
        } else if (timer !== null) {
            clearInterval(timer);
        }

        return () => {
            if (timer !== null) {
                clearInterval(timer);
            }
        };
    }, [isRunning]);


    return (
        <div>
            <p>Counter: {counter} seconds</p>
            <button onClick={startCounter}>Start</button>
            <button onClick={stopCounter}>Stop</button>
            <button onClick={() => onSave(counter, startTime!, endTime!)}>Save</button>
        </div>
    );
};

export default Counter;
