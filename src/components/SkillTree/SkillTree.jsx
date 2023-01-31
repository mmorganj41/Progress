import './SkillTree.css';
import React, {useContext, useState} from "react";
import { Segment, Divider, Header, Icon } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';
import CreateHabitForm from '../CreateHabitForm/CreateHabitForm';

export default function SkillTree({skill, createSubskill, createHabit, index, subskillIndex, completeHabit, uncompleteHabit}) {
    const [showTree, setShowTree] = useState(true);
    const [showForm, setShowForm] = useState(false);
    
    const skillLevel = useContext(SkillLevelContext)

    const subskillList = skill?.subskills ? skill.subskills.map((subskill, i) => {
        const subskillCopy = {...subskill}
        subskillCopy.color = skill.color;
        return (<SkillTree key={subskill._id} index={index} subskillIndex={i} skill={subskillCopy} createHabit={createHabit} completeHabit={completeHabit} uncompleteHabit={uncompleteHabit}/>);
    }) : null; 

    const habitList = skill?.habits ? skill.habits.map((habit, i) => {
        return (<HabitCard key={habit._id} habit={habit} color={skill.color} completeHabit={completeHabit} uncompleteHabit={uncompleteHabit} index={index} subskillIndex={subskillIndex} habitIndex={i}/>);
    }) : null;

    function handleShowForm(e) {
        e.stopPropagation();
        setShowForm(!showForm);
    }

    function alwaysShowTree() {
        setShowTree(true)
    }

    function handleShowTree(e) {
        if (['INPUT', 'LABEL', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return
        setShowTree(!showTree);
    }

    return(
    <SkillLevelContext.Provider value={skillLevel + 1}>
        <Segment className='SkillTree main'>
            <Segment inverted color={skill?.color} onClick={handleShowTree}>
                <div className='SkillTree header'>
                {skillLevel < 1 ? (<h3>{skill?.name}</h3>) : (<h5>{skill?.name}</h5>)}
                <Icon name={showForm ? "minus circle" : "plus circle"} onClick={handleShowForm}/>
                </div>
                {showForm && skillLevel < 1 ? <CreateSubskillForm showTree={alwaysShowTree} index={index} skill={skill} createSubskill={createSubskill}/> : null}
                {showForm ? <CreateHabitForm showTree={alwaysShowTree} skill={skill} index={index} subskillIndex={subskillIndex} createHabit={createHabit}/> : null }
            </Segment>
            {showTree && habitList}
            {showTree && subskillList}
            </Segment>
        </SkillLevelContext.Provider>
    )
}