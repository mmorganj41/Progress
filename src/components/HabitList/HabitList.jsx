import React from "react";
import { Container } from "semantic-ui-react";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";

export default function HabitList({skills, createSkill, createSubskill, createHabit}) {
    const skillTrees = skills ? skills.map(skill => {
        return (<SkillTree 
            key={skill._id} 
            skill={skill} 
            createSubskill={createSubskill}
            createHabit={createHabit}
        />)
    }) : null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm createSkill={createSkill}/>
            {skillTrees}
        </Container>
    );
}