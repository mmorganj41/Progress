import React, {useContext, useState, useEffect} from 'react';
import { Card, Icon } from 'semantic-ui-react';
import subskill from '../../../models/subskill';
import { DateContext } from '../../context/DateContext/DateContext';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';
import './HabitCard.css';
import skillsService from '../../utils/skillsService';

export default function HabitCard({habit, color, state, deleteHabit, completeHabit, uncompleteHabit, index, subskillIndex, habitIndex}) {
    const [showForm, setShowForm] = useState(false);
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

    async function handleDelete(e) {
        e.preventDefault();
        console.log(habit);
        await deleteHabit(habit, skillLevel, index, subskillIndex, habitIndex);
    }

    const action = () => {
        if (state === 'delete') {
            return(            
                <div className='HabitCard ActionIcon'>
                    <Icon name='remove circle' onClick={handleDelete}/>
                </div>)
        } else if (state === 'edit') {
            if (showForm) {
                return(
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle outline' onClick={() => setShowForm(false)}/>
                    </div>
                )    
            } else {
                return(
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle' onClick={() => setShowForm(true)}/>
                    </div>
                )
            }
        }
    }

    return (
        <Card fluid color={color}>
            <Card.Content>
                <Card.Header className='HabitCard Header'>
                    <Icon name={icon} size='large' onClick={handleClick}/>
                    {habit?.name}
                    {action()}
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                {habit?.description}
            </Card.Content>
        </Card>
    )
}