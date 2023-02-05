
import React from 'react';

import HabitHistoryCard from '../HabitHistoryCard/HabitHistoryCard';

export default function RecentHabits({habits}) {
    
    const habitHistory = [];

    for (let key in habits) {
        if (habits[key].length) {
            habitHistory.push(
                <HabitHistoryCard day={key} habits={habits[key]} />
                );
        }
    }
    
    return (
        <>
            {habitHistory}
        </>
    )
}