import './SkillTree.css';
import React, {useContext, useState} from "react";
import { Segment, Divider, Header, Image, Icon } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';
import CreateHabitForm from '../CreateHabitForm/CreateHabitForm';
import skillsService from '../../utils/skillsService';

export default function SkillTree({skill, state, deleteSkill, deleteHabit, createSubskill, createHabit, index, subskillIndex, completeHabit, uncompleteHabit}) {
    const [showTree, setShowTree] = useState(true);
    const [showForm, setShowForm] = useState(false);
    
    const skillLevel = useContext(SkillLevelContext)

    const subskillList = skill?.subskills ? skill.subskills.map((subskill, i) => {
        const subskillCopy = {...subskill}
        subskillCopy.color = skill.color;
        return (<SkillTree 
            key={subskill._id} 
            state={state} 
            index={index} 
            subskillIndex={i}
            skill={subskillCopy} 
            createHabit={createHabit} 
            completeHabit={completeHabit} 
            uncompleteHabit={uncompleteHabit}
            deleteSkill={deleteSkill}
            deleteHabit={deleteHabit}
        />);
    }) : null; 

    const habitList = skill?.habits ? skill.habits.map((habit, i) => {
        return (<HabitCard 
            key={habit._id} 
            habit={habit} 
            color={skill.color} 
            state={state} 
            completeHabit={completeHabit} 
            uncompleteHabit={uncompleteHabit} 
            index={index} 
            subskillIndex={subskillIndex} 
            habitIndex={i}
            deleteHabit={deleteHabit}
        />);
    }) : null;

    function handleShowForm(e) {
        e.stopPropagation();
        setShowForm(!showForm);
    }

    function alwaysShowTree() {
        setShowTree(true)
    }

    function hideForm() {
        setShowForm(false);
    }

    function handleShowTree(e) {
        if (['INPUT', 'LABEL', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return
        setShowTree(!showTree);
    }

    async function handleDelete(e) {
        e.stopPropagation();
        await deleteSkill(skill, skillLevel, index, subskillIndex)
    }

    const title = () => {
        if (skillLevel < 1) {
            return(
                <>
                    <Image src={skill.photoUrl ? skill.photoUrl : "https://i.imgur.com/2o8gKIA.png"} avatar />
                    <h3>{skill?.name}</h3>
                </>) 
        }
        
        return (<h5>{skill?.name}</h5>)
    }

    const actionPanel = () => {
        if (state === 'add') {
            return (<>
                <div className='SkillTree header'>
                    {title()}
                    <Icon name={showForm ? "minus circle" : "plus circle"} onClick={handleShowForm}/>
                </div>
                {showForm && skillLevel < 1 ? <CreateSubskillForm showTree={alwaysShowTree} hideForm={hideForm} index={index} skill={skill} createSubskill={createSubskill}/> : null}
                {showForm ? <CreateHabitForm showTree={alwaysShowTree} hideForm={hideForm} skill={skill} index={index} subskillIndex={subskillIndex} createHabit={createHabit}/> : null }
            </>)
        } else if (state === 'edit') {
            if (showForm) {
                return(
                <div className='SkillTree header'>
                    {title()}
                    <Icon name="dot circle outline" onClick={handleShowForm}/>
                </div>) 
            } else {
                return(
                <div className='SkillTree header'>
                    {title()}
                    <Icon name="dot circle" onClick={handleShowForm}/>
                </div>) 
            }
        } else if (state === 'delete') {
            return(
                <div className='SkillTree header'>
                    {title()}
                    <Icon name="remove circle" onClick={handleDelete}/>
                </div>) 
        }
    }

    return(
    <SkillLevelContext.Provider value={skillLevel + 1}>
        <Segment className='SkillTree main'>
            <Segment inverted color={skill?.color} onClick={handleShowTree}>
                {actionPanel()}
            </Segment>
            {showTree && habitList}
            {showTree && subskillList}
            </Segment>
        </SkillLevelContext.Provider>
    )
}