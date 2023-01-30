import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Input, Select } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { UserContext } from "../../context/UserContext/UserContext";
import { colorOptions } from "../../utils/colors";
import skillsService from "../../utils/skillsService";

export default function CreateSkillForm(){
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        color: 'teal',
    });
    const loggedUser = useContext(UserContext);

    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    async function handleSubmit() {
        try {

        } catch(err) {
            setError(err.message);
        }
    }


    return (
        <Form>
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
    )
}