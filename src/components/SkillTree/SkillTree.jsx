import './SkillTree.css';
import React, {useContext} from "react";
import { Segment, Header } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";

export default function SkillTree({}) {
    const habitList = null;
    const skillList = null;
    const skillLevel = useContext(SkillLevelContext)


    return(
        <Segment className='SkillTree'>
        <Segment inverted color='teal'>
            <Header size='medium'>Skill Name</Header>   
        </Segment>
            <SkillLevelContext.Provider value={skillLevel + 1}>
                <HabitCard />
                {skillLevel < 1 ? <SkillTree /> : null}
                {habitList}
                {skillList}
            </SkillLevelContext.Provider>
        </Segment>
    )
}