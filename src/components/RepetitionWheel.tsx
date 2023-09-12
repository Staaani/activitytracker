// src/components/RepetitionWheel.tsx

import React, {useState} from 'react';

// src/components/RepetitionWheel.tsx

interface Props {
    onSave: (repetitions: number, start: Date, end: Date) => void;
}

const RepetitionWheel: React.FC<Props> = ({ onSave }) => {
    const [repetitions, setRepetitions] = useState<number>(0);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const handleRepetitions = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRepetitions(parseInt(e.target.value, 10));
        if (!startTime) {
            setStartTime(new Date());
        }
    };

    const handleSave = () => {
        const endTime = new Date();
        onSave(repetitions, startTime!, endTime);
        setStartTime(null); // Reset the start time
    };

    return (
        <div>
            <input
                type="number"
                min="0"
                max="100"
                onChange={handleRepetitions}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};


export default RepetitionWheel;
