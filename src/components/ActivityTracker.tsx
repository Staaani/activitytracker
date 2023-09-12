// src/components/ActivityTracker.tsx

import React, {useState} from 'react';
import {Activity} from '../models/Activity';
import Counter from './Counter';
import ActivityDropdown from './ActivityDropdown';
import RepetitionWheel from './RepetitionWheel';

const ActivityTracker: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [allActivities, setAllActivities] = useState([
        {name: 'Breath', type: 'time'},
        {name: 'Push Ups', type: 'repetitions'},
    ]);

    const predefinedActivities = [
        {name: 'Breath', type: 'time'},
        {name: 'Push Ups', type: 'repetitions'},
    ];

    const selectedActivityType = allActivities.find(activity => activity.name === selectedActivity)?.type;

// src/components/ActivityTracker.tsx

    const saveCounterValue = (count: number, startTime: Date, endTime: Date) => {
        const newActivity: Activity = {
            id: new Date().toISOString(),
            name: selectedActivity!,
            type: 'time',
            record: count,
            timestamp: {start: startTime, end: endTime}
        };
        setActivities([...activities, newActivity]);
    };

    const saveRepetitions = (repetitions: number, startTime: Date, endTime: Date) => {
        const newActivity: Activity = {
            id: new Date().toISOString(),
            name: selectedActivity!,
            type: 'repetitions',
            record: repetitions,
            timestamp: {start: startTime, end: endTime}
        };
        setActivities([...activities, newActivity]);
    };

    const [newActivityName, setNewActivityName] = useState('');
    const [newActivityType, setNewActivityType] = useState('time');

    const handleAddActivity = () => {
        const newActivity = {name: newActivityName, type: newActivityType};
        setAllActivities([...allActivities, newActivity]);
        setNewActivityName('');
        setNewActivityType('time');
    };


    return (
        <div>
            <h1>Activity Tracker</h1>
            <h2>Add New Activity</h2>
            <input
                type="text"
                placeholder="Activity name"
                value={newActivityName}
                onChange={(e) => setNewActivityName(e.target.value)}
            />
            <select
                value={newActivityType}
                onChange={(e) => setNewActivityType(e.target.value)}
            >
                <option value="time">Time</option>
                <option value="repetitions">Repetitions</option>
            </select>
            <button onClick={handleAddActivity}>Add Activity</button>
            <ActivityDropdown activities={allActivities} onSelect={setSelectedActivity}/>
            {selectedActivity && (
                <>
                    <h2>Selected Activity: {selectedActivity}</h2>
                    {selectedActivityType === 'time' ? (
                        <Counter onSave={saveCounterValue} />
                    ) : (
                        <RepetitionWheel onSave={saveRepetitions} />
                    )}
                </>
            )}

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
