import React, {useContext, useState, useEffect} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { DateContext } from '../../context/DateContext/DateContext';
import skillsService from '../../utils/skillsService';

export default function HabitCard({habit, color, completeHabit}) {
    const date = useContext(DateContext);
    const complete = !!habit.completionDates[date];
    const icon = complete ? 'check circle' : 'circle outline';

    async function handleClick() {
        const data = {date};
        if (complete) {

        } else {
            await completeHabit(data, habit);
        }
    }

    return (
        <Card fluid color={color}>
            <Card.Content>
                <Card.Header>
                    <Icon name={icon} size='large' onClick={handleClick}/>
                    {habit?.name}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                {habit?.description}
            </Card.Content>
        </Card>
    )
}