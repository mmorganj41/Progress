import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Segment, Select, Icon, Transition } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { colorOptions } from "../../utils/options";
import useFeedContext from "../../context/FeedContext/FeedContext";

export default function CreateSkillForm({handleCreateSkillFormShow}){
    const {createSkill} = useFeedContext();
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        color: 'teal',
    });
    const [file, setFile] = useState(null);

    function handleFileInput(e) {
        setFile(e.target.files[0]);
    }

    function handleChange(e) {
        e.preventDefault();
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("photo", file);

            formData.append('color', formState.color);
            formData.append('name', formState.name)
            await createSkill(formData);
            handleCreateSkillFormShow(e);
        } catch(err) {
            setError(err.message);
        }
    }


    return (
        <Transition animation='drop' transitionOnMount unmountOnHide>
            <div>
            <Segment basic className='SkillTree main'>
                    <Segment inverted color={formState.color}>
                    <div className='SkillTree header'>

                        <Form className='EditSkillForm Form' onSubmit={handleSubmit}>
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                            <Form.Input 
                                name='name'
                                placeholder='Name'
                                value={formState.name}
                                onChange={handleChange}
                            />
                            <Form.Field 
                                name='color'
                                control={Select}
                                value={formState.color} 
                                options={colorOptions}
                                onChange={(e, data) => updateFormState( draft => {
                                    draft.color = data.value;
                                })}
                            />
                            <Button type='submit'>Submit</Button>
                        {error ? <ErrorMessage error={error} /> : null }
                        </Form>
                        <Icon name="remove circle" onClick={handleCreateSkillFormShow} size="large"/>
                    </div>
                </Segment>
            </Segment>
            </div>
        </Transition>
            
    )
}