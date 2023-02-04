import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Card, Form, Button, Input, Select, Divider } from "semantic-ui-react";
import NumericInput from 'react-numeric-input'; 
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { difficultyOptions } from "../../utils/options";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import { DateContext } from "../../context/DateContext/DateContext";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';



export default function CreateHabitForm({skill, createHabit, showTree, hideForm, index, subskillIndex}){
    const skillLevel = useContext(SkillLevelContext);
    const date = useContext(DateContext);
    
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        description: '',
        repeats: false,
        repeatDays: '0',
        difficulty: 'trivial',
        startDate: date,
        ends: false,
        endDate: null,
    });
    


    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        });
    }

    function handleSelectDate(e, data, name) {
        console.log(data, name);
        console.log(formState);
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
            await createHabit(formState, skill, index, skillLevel, subskillIndex);
            showTree();
            hideForm();
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <div draggable onDragStart={(e) => {
            e.preventDefault(); 
            e.stopPropagation();}}>               
            <Card fluid>
            <Form onSubmit={handleSubmit}>
                <Card.Content>
                        <strong>Create Habit:</strong>
                        <Form.Group widths='equal'>
                            <Form.Input 
                                control={Input}
                                name='name'
                                placeholder='Name'
                                label='Name'
                                value={formState.name}
                                onChange={handleChange}
                            />
                            <Form.Field 
                                label='Difficulty'
                                name='difficulty'
                                control={Select}
                                value={formState.difficulty} 
                                options={difficultyOptions}
                                onChange={(e, data) => updateFormState( draft => {
                                    draft.difficulty = data.value;
                                })}
                            />
                        </Form.Group>
                </Card.Content>
                <Card.Content extra>
                <div className="CreateHabitCard Details">
                    <SemanticDatepicker label='Start Date' value={formState.startDate} onChange={(e, data) => handleSelectDate(e, data, 'startDate')}/>
                    <Form.Checkbox label='Ends?' checked={formState.ends} onChange={(e, data) => handleCheck(e, data, 'ends')}/>
                    {formState.ends ?
                    <SemanticDatepicker label='End Date' value={formState.endDate} onChange={(e, data) => handleSelectDate(e, data, 'endDate')} /> 
                    :
                    <SemanticDatepicker disabled label='End Date' value={formState.endDate} onChange={(e, data) => handleSelectDate(e, data, 'endDate')} />
                    }
                    
                    <Form.Checkbox label='Repeats (every x days)?' checked={formState.repeats} onChange={(e, data) => handleCheck(e, data, 'repeats')}/>
                    {formState.repeats ? 
                    <NumericInput
                        name='repeatDays'
                        placeholder='0'
                        min={0}
                        value={formState.repeatDays}
                        onChange={handleNumberChange}
                    />
                    :
                    <NumericInput
                        name='repeatDays'
                        placeholder='0'
                        min={0}
                        disabled
                        value={formState.repeatDays}
                        onChange={handleNumberChange}
                    />
                    }
                    </div>
                <Form.TextArea
                    label='Description'
                    name='description'
                    placeholder='Describe your habit...'
                    value={formState.description}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
                </Card.Content>
                {error ? <ErrorMessage error={error} /> : null }
            </Form>
            </Card>
        </div>
    )
}
