// src/components/RepetitionWheel.tsx

import React, {useState} from 'react';

// src/components/RepetitionWheel.tsx

interface Props {
    onSave: (repetitions: number, start: Date, end: Date) => void;
}

const RepetitionWheel: React.FC<Props> = ({ onSave }) => {
    const [startTime, setStartTime] = useState<Date | null>(null);

    const handleRepetitions = (e: React.ChangeEvent<HTMLInputElement>) => {
        const repetitions = parseInt(e.target.value, 10);
        const start = startTime || new Date();
        const end = new Date();
        setStartTime(start);
        onSave(repetitions, start, end);
    };

    return (
        <div>
            <input
                type="number"
                min="0"
                max="100"
                onChange={handleRepetitions}
            />
        </div>
    );
};


export default RepetitionWheel;
