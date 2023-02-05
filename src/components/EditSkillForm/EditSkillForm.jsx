import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { colorOptions } from "../../utils/options";
import { Form, Image, Button, Icon, Select } from "semantic-ui-react";
import './EditSkillForm.css';
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";

export default function EditSkillForm({skill, handleShowEdit, editSkill, index, subskillIndex}) {
    const [formState, updateFormState] = useImmer(skill);
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const skillLevel = useContext(SkillLevelContext);

    function handleChange(e) {
        updateFormState(draft => {
            draft[e.target.name] = e.target.value;
        })
    }

    async function handleSubmit(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);
        
        formData.append('color', formState.color);
        formData.append('name', formState.name)
        try {
            await editSkill(formData, skill, skillLevel, index, subskillIndex);
            handleShowEdit(false);
        } catch(err) {
            setError('Error. Could not edit skill.');
        }
        
    }

    function handleFileInput(e) {
        setFile(e.target.files[0]);
    }

    return(
        <div className='SkillTree header'
            draggable 
            onDragStart={(e) => {
                e.preventDefault(); 
                e.stopPropagation();}}
        >

            <Form className='EditSkillForm Form' onSubmit={handleSubmit}>            
                            {skillLevel <= 1 ?
                            <Form.Input
                                type="file"
                                name="photo"
                                placeholder="upload image"
                                onChange={handleFileInput}
                            />
                            : null}
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

