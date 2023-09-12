import React from 'react';

interface Props {
    activities: { name: string; type: string }[];
    onSelect: (activityName: string) => void;
}

const ActivityDropdown: React.FC<Props> = ({ activities, onSelect }) => {
    return (
        <select onChange={(e) => onSelect(e.target.value)}>
            <option value="">Select an activity</option>
            {activities.map((activity, index) => (
                <option key={index} value={activity.name}>
                    {activity.name}
                </option>
            ))}
        </select>
    );
};

export default ActivityDropdown;