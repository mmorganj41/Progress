import React, {useState, useContext} from 'react';
import { useImmer } from "use-immer";
import { Icon, Card, Header, Input, Select, Checkbox, TextArea, Button } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import NumberInput from 'semantic-ui-react-numberinput';
import { difficultyOptions } from '../../utils/options';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { SkillLevelContext } from '../../context/SkillLevelContext/SkillLevelContext';

export default function EditHabitForm({habit, setEditState, editHabit, icon, index, handleShowEdit, subskillIndex, habitIndex}) {
    const skillLevel = useContext(SkillLevelContext);
    const [error, setError] = useState(null);

    const [formState, updateFormState] = useImmer({
        name: habit.name,
        description: habit.description,
        repeats: !!habit.repeatDays,
        repeatDays: habit.repeatDays,
        difficulty: habit.difficulty,
        startDate: new Date(habit.startDate),
        ends: !!habit.endDate,
        endDate: habit.endDate ? Date.parse(habit.endDate): null,
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
            handleShowEdit(e);
            await editHabit(formState, habit, index, skillLevel, subskillIndex, habitIndex);
            
        } catch(err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <>
            <Card.Content>
                <Card.Header className='HabitCard Header'>
                    <Icon name={icon} size='large'/>
                    <Input 
                        name='name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <div className='HabitCard ActionIcon'>
                        <Icon name='dot circle outline' onClick={handleShowEdit}/>
                    </div>
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
                        <strong>Start Date: </strong>
                        <SemanticDatepicker clearable={false} value={formState.startDate} onChange={(e, data) => handleSelectDate(e, data, 'startDate')}/>
                    </div>
                    <div className='EditHabitForm'>
                        <div>
                        <Checkbox checked={formState.ends} onChange={(e, data) => handleCheck(e, data, 'ends')}/>
                        <strong> End Date:</strong>
                        </div>
                        <div>
                        {formState.ends ?
                        <SemanticDatepicker value={formState.endDate} onChange={(e, data) => handleSelectDate(e, data, 'endDate')} /> 
                        :
                        <SemanticDatepicker disabled value={formState.endDate} onChange={(e, data) => handleSelectDate(e, data, 'endDate')} />
                        }
                        </div>
                    </div>
                    <div className='EditHabitForm'>
                        <div>
                        <Checkbox checked={formState.repeats} onChange={(e, data) => handleCheck(e, data, 'repeats')}/>
                        <strong> Repeats: </strong>
                        </div>
                        <div>
                        {formState.repeats ? 
                        <NumberInput
                            control={Input}
                            name='repeatDays'
                            minValue={0}
                            value={formState.repeatDays}
                            onChange={handleNumberChange}
                            buttonPlacement="leftAndRight" 
                        />
                        :
                        <NumberInput
                            control={Input}
                            name='repeatDays'
                            minValue={0}
                            disabled
                            value={formState.repeatDays}
                            onChange={handleNumberChange}
                            buttonPlacement="leftAndRight" 
                        />
                        }
                        </div>
                    </div>       
                </div>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={handleSubmit}>Submit</Button>
            </Card.Content>
        </>
    )
}