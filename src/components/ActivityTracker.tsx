// src/components/ActivityTracker.tsx

import React, { useState } from 'react';
import { Activity } from '../models/Activity';
import Counter from './Counter';
import ActivityDropdown from './ActivityDropdown';
import RepetitionWheel from './RepetitionWheel';

const ActivityTracker: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    const predefinedActivities = [
        { name: 'Breath', type: 'time' },
        { name: 'Push Ups', type: 'repetitions' },
    ];

    const selectedActivityType = predefinedActivities.find(
        (activity) => activity.name === selectedActivity
    )?.type;

// src/components/ActivityTracker.tsx

    const saveCounterValue = (count: number, startTime: Date, endTime: Date) => {
        const newActivity: Activity = {
            id: new Date().toISOString(),
            name: selectedActivity!,
            type: 'time',
            record: count,
            timestamp: { start: startTime, end: endTime }
        };
        setActivities([...activities, newActivity]);
    };

    const saveRepetitions = (repetitions: number, startTime: Date, endTime: Date) => {
        const newActivity: Activity = {
            id: new Date().toISOString(),
            name: selectedActivity!,
            type: 'repetitions',
            record: repetitions,
            timestamp: { start: startTime, end: endTime }
        };
        setActivities([...activities, newActivity]);
    };


    return (
        <div>
            <h1>Activity Tracker</h1>
            <ActivityDropdown activities={predefinedActivities} onSelect={setSelectedActivity} />

            {selectedActivityType === 'time' ? (
                <Counter onSave={saveCounterValue} />
            ) : selectedActivityType === 'repetitions' ? (
                <RepetitionWheel onSave={saveRepetitions} />
            ) : null}

            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        {activity.name} ({activity.type}) - Record: {activity.record}
                        <ul>
                            <li>
                                Start: {new Date(activity.timestamp.start).toLocaleString()},
                                End: {new Date(activity.timestamp.end).toLocaleString()}
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>


        </div>


    );
};

export default ActivityTracker;
