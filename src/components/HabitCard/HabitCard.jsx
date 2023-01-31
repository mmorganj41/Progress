import React, {useContext, useState, useEffect} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import subskill from '../../../models/subskill';
import { DateContext } from '../../context/DateContext/DateContext';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';

export default function HabitCard({habit, color, completeHabit, uncompleteHabit, index, subskillIndex, habitIndex}) {
    const date = useContext(DateContext);
    const complete = !!habit.completionDates[date];
    const icon = complete ? 'check circle' : 'circle outline';
    const skillLevel = useContext(SkillLevelContext);
    async function handleClick() {
        const data = {date};
        if (complete) {
            await uncompleteHabit(data, habit, index, skillLevel, subskillIndex, habitIndex);
        } else {
            await completeHabit(data, habit, index, skillLevel, subskillIndex, habitIndex);
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