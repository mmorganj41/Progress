import React from "react";
import { Segment, Header } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";

export default function SkillTree({}) {
    const habitList = null;
    const skillList = null;

    return(
        <div>
        <Segment inverted color='teal'>
            <Header size='medium'>Skill Name</Header>   
        </Segment>
            <HabitCard />
            {habitList}
            {skillList}
        </div>
    )
}