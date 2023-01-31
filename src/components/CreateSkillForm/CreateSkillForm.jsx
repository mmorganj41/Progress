import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Input, Select, Divider } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { colorOptions } from "../../utils/options";

export default function CreateSkillForm({createSkill}){
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        color: 'teal',
    });


    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            await createSkill(formState);
        } catch(err) {
            setError(err.message);
        }
    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
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
                        label='Color'
                        name='color'
                        control={Select}
                        value={formState.color} 
                        options={colorOptions}
                        onChange={(e, data) => updateFormState( draft => {
                            draft.color = data.value;
                        })}
                    />
                    <Button type='submit'>Submit</Button>
                </Form.Group>
                {error ? <ErrorMessage error={error} /> : null }
            </Form>
    </>
    )
}