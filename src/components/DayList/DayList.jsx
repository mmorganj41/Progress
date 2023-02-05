import React from 'react';
import { Card } from 'semantic-ui-react';

export default function DayList({habits}) {
    const habitList = habits.map(habit => {
        return (<li>{habit?.name}</li>)
    })

    return (
        <Card.Content>
        Completed:
            <ul>
            {habitList}
            </ul>
        </Card.Content>
    )
}