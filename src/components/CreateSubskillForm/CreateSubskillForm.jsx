import React, {useState} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Input, Select, Divider } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function CreateSubskillForm({skill, createSubskill}){
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
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
            await createSubskill(formState, skill);
        } catch(err) {
            setError(err.message);
        }
    }


    return (
        <>
            <Divider inverted />
            <Form onSubmit={handleSubmit}>
                <strong>Create Subskill:</strong>
                <Form.Group widths='equal'>
                    <Form.Input 
                        control={Input}
                        name='name'
                        placeholder='Name'
                        value={formState.name}
                        onChange={handleChange}
                    />
                    <Button type='submit'>Submit</Button>
                </Form.Group>
                {error ? <ErrorMessage error={error} /> : null }
            </Form>
        </>
    )
}