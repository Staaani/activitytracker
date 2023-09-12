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
        const activityIndex = activities.findIndex(activity => activity.name === selectedActivity);
        if (activityIndex !== -1) {
            const updatedActivity = { ...activities[activityIndex] };
            updatedActivity.records.push(count);
            const updatedActivities = [...activities];
            updatedActivities[activityIndex] = updatedActivity;
            setActivities(updatedActivities);
        } else {
            const newActivity: Activity = {
                id: new Date().toISOString(),
                name: selectedActivity!,
                type: 'time',
                records: [count],
                timestamps: [{ start: startTime, end: endTime }]  // Add this line
            };
            setActivities([...activities, newActivity]);
        }
    };

    const saveRepetitions = (repetitions: number, startTime: Date, endTime: Date) => {
        const activityIndex = activities.findIndex(activity => activity.name === selectedActivity);
        if (activityIndex !== -1) {
            const updatedActivity = { ...activities[activityIndex] };
            updatedActivity.records.push(repetitions);
            const updatedActivities = [...activities];
            updatedActivities[activityIndex] = updatedActivity;
            setActivities(updatedActivities);
        } else {
            const newActivity: Activity = {
                id: new Date().toISOString(),
                name: selectedActivity!,
                type: 'repetitions',
                records: [repetitions],
                timestamps: [{ start: startTime, end: endTime }]  // Add this line
            };
            setActivities([...activities, newActivity]);
        }
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
                        {activity.name} ({activity.type}) - Records: {activity.records.join(', ')}
                        <ul>
                            {activity.timestamps.map((timestamp, index) => (
                                <li key={index}>
                                    Start: {new Date(timestamp.start).toLocaleString()}, End: {new Date(timestamp.end).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>


        </div>


    );
};

export default ActivityTracker;
