import React, {useContext, useState, useEffect} from 'react';
import { Card, Icon, Grid, Header } from 'semantic-ui-react';
import { DateContext } from '../../context/DateContext/DateContext';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';
import './HabitCard.css';
import EditHabitForm from '../EditHabitForm/EditHabitForm';
import { difficultyColoring} from '../../utils/leveling';

export default function HabitCard({habit, totals, updateTotals, color, state, editHabit, deleteHabit, completeHabit, uncompleteHabit, index, subskillIndex, habitIndex}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const date = useContext(DateContext)?.toISOString().split('T')[0];
    const complete = !!habit.completionDates[date];
    const icon = complete ? 'check circle' : 'circle outline';
    const skillLevel = useContext(SkillLevelContext);

    let difficultyColor = difficultyColoring(habit?.difficulty);
    
    useEffect(() => {
        updateTotals(draft => {
            if (complete) draft.complete += 1;
            draft.total += 1;
        })
        return () => updateTotals(draft => {
            if (complete) draft.complete -= 1;
            draft.total -= 1;
        })
    }, [date, complete])

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
        if (window.confirm('Are you sure you wish to delete this item?')) {
            await deleteHabit(habit, skillLevel, index, subskillIndex, habitIndex);
        }
    }

    function handleShowEdit(e) {
        e.stopPropagation();
        setShowEdit(!showEdit);
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
            if (showEdit) {
                return(
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle outline' onClick={handleShowEdit}/>
                    </div>
                )    
            } else {
                return(
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle' onClick={handleShowEdit}/>
                    </div>
                )
            }
        }
    }

    const details = () => {
       if (showDetails) return(
        <>
            <Card.Content extra>
                <Header textAlign='right' as='h4' style={{textTransform: 'capitalize', color: difficultyColor}}>{habit?.difficulty}</Header>
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
                        <strong>Repeats: </strong> {habit?.repeatDays ? `Every ${habit.repeatDays} days` : 'Never'}
                    </div>
                </div>
            </Card.Content>
        </>
        )
    }
    
    if (state === 'edit' && showEdit) {
        return(
        <div draggable onDragStart={(e) => {
            e.preventDefault(); 
            e.stopPropagation();}}>
            <Card fluid color={color}>
                <EditHabitForm 
                    habit={habit}
                    setShowEdit={setShowEdit} 
                    index={index} 
                    subskillIndex={subskillIndex}
                    habitIndex={habitIndex}
                    editHabit={editHabit}
                    handleShowEdit={handleShowEdit}
                    icon={icon}
                />
            </Card>
        </div>);
    } else {
    return (
        <div draggable onDragStart={(e) => {
            e.preventDefault(); 
            e.stopPropagation();}}>
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
        </div>);
    }
}