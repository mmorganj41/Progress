import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Input, Select, Divider } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { difficultyOptions } from "../../utils/options";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import { DateContext } from "../../context/DateContext/DateContext";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

export default function CreateHabitForm({skill, createHabit, showTree, hideForm, index, subskillIndex}){
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        description: '',
        repeats: false,
        repeatDays: '0',
        difficulty: 'trivial',
    });
    const skillLevel = useContext(SkillLevelContext);
    const date = useContext(DateContext);


    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    function handleCheck(e, data) {
        let checked = data.checked
        updateFormState(draft => {
            draft.repeats = checked;
        })
    }

    function handleNumberChange(newValue) {
        updateFormState(draft => {
            draft.repeatDays = newValue
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            let data = {...formState, date}
            await createHabit(data, skill, index, skillLevel, subskillIndex);
            showTree();
            hideForm();
        } catch(err) {
            setError(err.message);
        }
    }

    return (
        <>               
            <Divider inverted />
            <Form onSubmit={handleSubmit}>
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
                <Form.Group inline>
                    <SemanticDatepicker />
                    <SemanticDatepicker />
                    <Form.Checkbox label='Repeats?' checked={formState.repeats} onChange={(e, data) => handleCheck(e, data)}/>
                    {formState.repeats ? 
                    <NumberInput
                        control={Input}
                        name='repeatDays'
                        placeholder='0'
                        minValue={0}
                        value={formState.repeatDays}
                        onChange={handleNumberChange}
                        buttonPlacement="leftAndRight" 
                    />
                    :
                    <NumberInput
                        control={Input}
                        name='repeatDays'
                        placeholder='0'
                        minValue={0}
                        disabled
                        value={formState.repeatDays}
                        onChange={handleNumberChange}
                        buttonPlacement="leftAndRight" 
                    />
                    }
                    
                </Form.Group>
                <Form.TextArea
                    label='Description'
                    name='description'
                    placeholder='Describe your habit...'
                    value={formState.description}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
                
                {error ? <ErrorMessage error={error} /> : null }
            </Form>
        </>
    )
}