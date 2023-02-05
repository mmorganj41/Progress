
import React from 'react';
import DayHeader from '../DayHeader/DayHeader';
import DayList from '../DayList/DayList';
import { Card, Segment } from 'semantic-ui-react';

export default function RecentHabits({habits}) {
    
    const habitHistory = [];

    for (let key in habits) {
        if (habits[key].length) {
            habitHistory.push(
                <Card fluid>
                    <DayHeader day={key}/>
                    <DayList habits={habits[key]}/>
                </Card>
                );
        }
    }
    
    return (
        <>
            {habitHistory}
        </>
    )
}