import './SkillTree.css';
import React, {useContext, useState} from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';

export default function SkillTree({skill, createSubskill}) {
    const [showForm, setShowForm] = useState(false);
    const habitList = null;
    
    
    const skillLevel = useContext(SkillLevelContext)

    console.log(skill);
    const subskillList = skill?.subskills ? skill.subskills.map(subskill => {
        subskill.color = skill.color;
        return (<SkillTree key={subskill._id} skill={subskill} />);
    }) : null; 

    console.log(subskillList);

    return(
    <SkillLevelContext.Provider value={skillLevel + 1}>
        <Segment className='SkillTree main'>
        <Segment inverted color={skill?.color}>
            <div className='SkillTree header'>
            <Header size='medium'>{skill?.name}</Header>
            <Icon name={showForm ? "minus circle" : "plus circle"} onClick={() => setShowForm(!showForm)}/>
            </div>
            {showForm && skillLevel < 1 ? <CreateSubskillForm skill={skill} createSubskill={createSubskill}/> : null}
            </Segment>
                
                    <HabitCard color={skill?.color}/>
                    {subskillList}
            </Segment>
        </SkillLevelContext.Provider>
    )
}