import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Input, Select } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { UserContext } from "../../context/UserContext/UserContext";

export default function CreateSubskillForm({skill, createSubskill}){
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
    });

    const loggedUser = useContext(UserContext);

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
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Input 
                    control={Input}
                    name='name'
                    placeholder='Name'
                    label='Create Subskill'
                    value={formState.name}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form.Group>
            {error ? <ErrorMessage error={error} /> : null }
        </Form>
    )
}