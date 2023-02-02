import React, {useState, useContext} from 'react';
import { useImmer } from "use-immer";
import { Form, Card, Input, Select, Checkbox, TextArea, Button } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import NumberInput from 'semantic-ui-react-numberinput';
import { difficultyOptions } from '../../utils/options';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';

export default function EditHabitForm({habit, setEditState, index, subskillIndex, habitIndex}) {
    const skillLevel = useContext(SkillLevelContext);
    
    const [formState, updateFormState] = useImmer({
        name: habit.name,
        description: habit.description,
        repeats: !!habit.repeatDays,
        repeatDays: habit.repeatDays,
        difficulty: habit.difficulty,
        startDate: Date.parse(habit.date),
        ends: !!habit.endDate,
        endDate: habit.endDate ? Date.parse(habit.endDate) : null,
    });

    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        });
    }

    function handleSelectDate(e, data, name) {
        updateFormState(draft => {
            draft[name] = data.value;
        });
    }

    function handleCheck(e, data, name) {
        let checked = data.checked
        updateFormState(draft => {
            draft[name] = checked;
        });
    }

    function handleNumberChange(newValue) {
        updateFormState(draft => {
            draft.repeatDays = newValue
        });
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            console.log(formState);
            await editHabit(formState, habit, index, skillLevel, subskillIndex, habitIndex);
            setEditState(false);
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <>
            <Card.Content>
                <Card.Header className='HabitCard Header'>
                    <Icon name={icon} size='large' onClick={handleClick}/>
                    <Input 
                        name='name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Header textAlign='right' as='h4'>      
                    <Select
                        name='difficulty'
                        value={formState.difficulty} 
                        options={difficultyOptions}
                        onChange={(e, data) => updateFormState( draft => {
                            draft.difficulty = data.value;
                        })}
                    />
                </Header>
                <TextArea
                    name='description'
                    value={formState.description}
                    onChange={handleChange}
                />
            </Card.Content>
            <Card.Content extra>
                <div className='HabitCard Details'>
                    <div>
                        <Icon name="calendar" /><strong>Start Date: </strong>{habit?.startDate}
                    </div>
                    <div>
                        <strong>End Date: </strong><Input value={formState.endDate}/>
                    </div>
                    <div>
                        <strong>Repeats: </strong><Input value={formState.repeatDays}/> 
                    </div>       
                </div>
            </Card.Content>
            <Card.Content extra>
                <Button>Submit</Button>
            </Card.Content>
        </>
    )
}