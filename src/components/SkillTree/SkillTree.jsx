import './SkillTree.css';
import React, {useContext, useState} from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';

export default function SkillTree({skill, createSubskill}) {
    const [showForm, setShowForm] = useState(false);
    const habitList = null;
    const skillList = null;
    
    const skillLevel = useContext(SkillLevelContext)

    return(
        <Segment className='SkillTree main'>
        <Segment inverted color={skill?.color}>
            <div className='SkillTree header'>
            <Header size='medium'>{skill?.name}</Header>
            <Icon name={showForm ? "minus circle" : "plus circle"} onClick={() => setShowForm(!showForm)}/>
            </div>
            {showForm ? <CreateSubskillForm skill={skill} createSubskill={createSubskill}/> : null}
        </Segment>
            <SkillLevelContext.Provider value={skillLevel + 1}>
                <HabitCard color={skill?.color}/>
                {skillLevel < 1 ? <SkillTree /> : null}
                {habitList}
                {skillList}
            </SkillLevelContext.Provider>
        </Segment>
    )
}