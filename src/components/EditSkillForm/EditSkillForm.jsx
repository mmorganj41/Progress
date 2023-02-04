import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { colorOptions } from "../../utils/options";
import { Form, Image, Button, Icon, Select } from "semantic-ui-react";
import './EditSkillForm.css';
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";

export default function EditSkillForm({skill, handleShowEdit, editSkill, index, subskillIndex}) {
    const [formState, updateFormState] = useImmer(skill);
    const [error, setError] = useState(null);
    const skillLevel = useContext(SkillLevelContext);

    function handleChange(e) {
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        await editSkill(formState, skill, skillLevel, index, subskillIndex);
        handleShowEdit(false);
    }

    return(
        <div className='SkillTree header'
            draggable 
            onDragStart={(e) => {
                e.preventDefault(); 
                e.stopPropagation();}}
        >
            {skillLevel <= 1 ?
            <Image src={skill.photoUrl ? skill.photoUrl : "https://i.imgur.com/2o8gKIA.png"} avatar /> : null}
            <Form className='EditSkillForm Form' onSubmit={handleSubmit}>
                            <Form.Input 
                                name='name'
                                placeholder='Name'
                                value={formState.name}
                                onChange={handleChange}
                            />
                            {skillLevel <= 1 ?
                            (<>
                                <Form.Field 
                                    name='color'
                                    control={Select}
                                    value={formState.color} 
                                    options={colorOptions}
                                    onChange={(e, data) => updateFormState( draft => {
                                        draft.color = data.value;
                                    })}
                                />
                            </>) : null }
                            <Button type='submit'>Submit</Button>
                        {error ? <ErrorMessage error={error} /> : null }
            </Form>
            <Button icon onClick={handleShowEdit}>
            <Icon name="stop" size="large"/>
            </Button>
        </div>);
}

