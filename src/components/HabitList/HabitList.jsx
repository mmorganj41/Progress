import React from "react";
import { Container } from "semantic-ui-react";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";

export default function HabitList({skills, createSkill, createSubskill, completeHabit, createHabit}) {
    const skillTrees = skills ? skills.map((skill, i) => {
        return (<SkillTree 
            key={skill._id} 
            skill={skill} 
            createSubskill={createSubskill}
            createHabit={createHabit}
            index={i}
            completeHabit={completeHabit}
        />)
    }) : null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm createSkill={createSkill}/>
            {skillTrees}
        </Container>
    );
}