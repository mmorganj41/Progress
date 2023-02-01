import React, {useContext, useState, useEffect} from 'react';
import { Card, Icon, Grid, Header } from 'semantic-ui-react';
import { DateContext } from '../../context/DateContext/DateContext';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';
import './HabitCard.css';
import skillsService from '../../utils/skillsService';

export default function HabitCard({habit, color, state, deleteHabit, completeHabit, uncompleteHabit, index, subskillIndex, habitIndex}) {
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const date = useContext(DateContext);
    const complete = !!habit.completionDates[date];
    const icon = complete ? 'check circle' : 'circle outline';
    const skillLevel = useContext(SkillLevelContext);
    async function handleClick(e) {
        e.stopPropagation();
        const data = {date};
        if (complete) {
            await uncompleteHabit(data, habit, index, skillLevel, subskillIndex, habitIndex);
        } else {
            await completeHabit(data, habit, index, skillLevel, subskillIndex, habitIndex);
        }
    }

    async function handleDelete(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log(habit);
        await deleteHabit(habit, skillLevel, index, subskillIndex, habitIndex);
    }

    function handleShowForm(e) {
        e.stopPropagation();
        setShowForm(!showForm);
    }

    function toggleShowDetails(e) {
        if (e.target.tag !== 'FORM' || e.target.tag !== 'INPUT' || e.target.tag !== 'LABEL') setShowDetails(!showDetails);
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
                        <Icon name='dot circle outline' onClick={handleShowForm}/>
                    </div>
                )    
            } else {
                return(
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle' onClick={handleShowForm}/>
                    </div>
                )
            }
        }
    }

    const details = () => {
       if (showDetails) return(
        <>
            <Card.Content extra>
                <Header as='h4' style={{textTransform: 'capitalize'}}>{habit?.difficulty}</Header>
                {habit?.description}
            </Card.Content>
            <Card.Content extra>
                <div className='HabitCard Details'>
                    <div>
                        <Icon name="calendar"/><strong>Start Date: </strong>{habit?.startDate}
                    </div>
                    <div>
                        <strong>End Date: </strong> {habit?.endDate ? habit?.endDate : 'Never'}
                    </div>
                    <div>
                        <strong>Repeats: </strong> {habit?.repeatDays ? `Every ${habit.repeatDays}` : 'Never'}
                    </div>
                            
                </div>
            </Card.Content>
        </>
        )
    }
            
    return (
        <Card fluid color={color}>
            <Card.Content onClick={toggleShowDetails}>
                <Card.Header className='HabitCard Header'>
                    <Icon name={icon} size='large' onClick={handleClick}/>
                    {habit?.name}
                    {action()}
                </Card.Header>
            </Card.Content>
                {details()}
        </Card>
    )
}