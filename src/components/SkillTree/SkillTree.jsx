import './SkillTree.css';
import React, {useContext, useState} from "react";
import { Segment, Divider, Header, Image, Icon } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';
import CreateHabitForm from '../CreateHabitForm/CreateHabitForm';
import EditSkillForm from '../EditSkillForm/EditSkillForm';
import { DateContext } from '../../context/DateContext/DateContext';

export default function SkillTree({skill, state, deleteSkill, editSkill, editHabit, deleteHabit, createSubskill, createHabit, index, subskillIndex, completeHabit, uncompleteHabit}) {
    const [showTree, setShowTree] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    
    const date = useContext(DateContext);
    const skillLevel = useContext(SkillLevelContext);

    const dateParsed = parseDays(Date.parse(date.toISOString().split('T')[0]));

    function parseDays(date) {
        const result = Math.round(date/(1000 * 60 * 60 * 24));
        return result;
    }

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
            editSkill={editSkill}
            editHabit={editHabit}
        />);
    }) : null; 

    const habitList = skill?.habits ? skill.habits.map((habit, i) => {
        if (habit.repeatDays) {
           if ((dateParsed - parseDays(Date.parse(habit.startDate))) % habit.repeatDays) {
            return null;
            } else {
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
                    editHabit={editHabit}
                />);
            } 
        } else if (date.toISOString().split('T')[0] === habit.startDate) {
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
        }

        return null;
        

    }) : null;

    function handleShowForm(e) {
        e.stopPropagation();
        setShowForm(!showForm);
    }

    function handleShowEdit(e) {
        if (e) e.stopPropagation();
        setShowEdit(!showEdit);
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
        if (window.confirm('Are you sure you wish to delete this item?')) {
            await deleteSkill(skill, skillLevel, index, subskillIndex);
        }
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
            if (showEdit) {
                return(
                    <EditSkillForm handleShowEdit={handleShowEdit} editSkill={editSkill} skill={skill} index={index} subskillIndex={subskillIndex}/>
                )
            } else {
                return(
                <div className='SkillTree header'>
                    {title()}
                    <Icon name="dot circle" onClick={handleShowEdit}/>
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