import React, {useState, useContext} from "react";
import { useImmer } from "use-immer";
import { Card, Form, Transition, Icon, Header, Button, Input, Select, TextArea, Checkbox, Divider } from "semantic-ui-react";
import NumericInput from 'react-numeric-input'; 
import { difficultyOptions } from "../../utils/options";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import { DateContext } from "../../context/DateContext/DateContext";
import ReactDatePicker from "react-datepicker";
import useFeedContext from "../../context/FeedContext/FeedContext";


export default function CreateHabitForm({skill,showTree, hideForm, index, subskillIndex}){
    const skillLevel = useContext(SkillLevelContext);
    const date = useContext(DateContext);
    const {createHabit} = useFeedContext();
    
    const [error, setError] = useState(null);
    const [formState, updateFormState] = useImmer({
        name: '',
        description: '',
        repeats: false,
        repeatDays: '1',
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

    function handleSelectDate(data, name) {
        console.log(data, name);
        console.log(formState);
        updateFormState(draft => {
            draft[name] = data;
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
            <Transition animation='drop' transitionOnMount unmountOnHide>         
            <Card fluid>
                        <Card.Content>
                <Card.Header className='HabitCard Header'>
                    <Icon name='circle outline' size='large'/>
                    <Input 
                        name='name'
                        value={formState.name}
                        onChange={handleChange}
                        placeholder='Name'
                    />
                    <div className='HabitCard ActionIcon'>
                        <Icon name='times circle' onClick={hideForm}/>
                    </div>
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Header textAlign='right' as='h4'>
                    {'Difficulty: '}       
                    <Select
                        name='difficulty'
                        value={formState.difficulty} 
                        options={difficultyOptions}
                        onChange={(e, data) => updateFormState( draft => {
                            draft.difficulty = data.value;
                        })}
                    />
                </Header>
                <TextArea
                    name='description'
                    value={formState.description}
                    onChange={handleChange}
                    fluid
                    inverse
                    placeHolder='Description'
                />
            </Card.Content>
            <Card.Content extra>
                <div className='EditHabitForm HabitCard Details'>
                    <div><strong>Start Date: </strong></div>
                    <div><ReactDatePicker selected={formState.startDate} onChange={(data) => handleSelectDate(data, 'startDate')}/></div>
                    <div>
                        <Checkbox checked={formState.ends} onChange={(e, data) => handleCheck(e, data, 'ends')}/>
                        <strong>{` End Date: `}</strong>
                    </div>
                    <div>
                        {formState.ends ?
                        <ReactDatePicker selected={formState.endDate} onChange={(data) => handleSelectDate(data, 'endDate')} /> 
                        :
                        <ReactDatePicker disabled selected={formState.endDate} onChange={(data) => handleSelectDate(data, 'endDate')} />
                        }
                    </div>
                    <div>
                        <Checkbox checked={formState.repeats} onChange={(e, data) => handleCheck(e, data, 'repeats')}/>
                        <strong> Repeats? (Every X Days): </strong>
                    </div>
                    <div>
                        {formState.repeats ? 
                        <NumericInput
                            name='repeatDays'
                            min={0}
                            value={formState.repeatDays}
                            onChange={handleNumberChange}
                        />
                        :
                        <NumericInput
                            name='repeatDays'
                            min={0}
                            disabled
                            value={formState.repeatDays}
                            onChange={handleNumberChange}
                        />
                        }
                    </div>       
                </div>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={handleSubmit}>Submit</Button>
            </Card.Content>
            </Card>
            </Transition>  
        </div>
    )
}
