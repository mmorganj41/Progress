import React, {useState} from "react";
import { useImmer } from "use-immer";
import { Form, Button, Icon, Transition, Segment } from "semantic-ui-react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function CreateSubskillForm({skill, createSubskill, index, showTree, hideForm, draggedOver, dragging}){
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
            await createSubskill(formState, skill, index);
            showTree();
            hideForm();
        } catch(err) {
            setError(err.message);
        }
    }


    return (
        <Transition animation='drop' transitionOnMount unmountOnHide> 
        <div draggable onDragStart={(e) => {
            e.preventDefault(); 
            e.stopPropagation();}}>
            <Segment basic inverted={draggedOver} disabled={dragging} className='SkillTree main'>
                    <Segment className='subskill' inverted color={skill?.color}>
                    <div className='SkillTree header'>
                        <Form className='EditSkillForm Form' onSubmit={handleSubmit}>
                            <Form.Input 
                                name='name'
                                placeholder='Name'
                                value={formState.name}
                                onChange={handleChange}
                            />

                            <Button type='submit'>Submit</Button>
                        {error ? <ErrorMessage error={error} /> : null }
                        </Form>
                        <Icon name="remove circle" onClick={hideForm} size="large"/>
                    </div>
            
            </Segment>
        </Segment>
        </div>
        </Transition>
    )
}