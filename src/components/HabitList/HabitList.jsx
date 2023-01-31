import React from "react";
import { Container } from "semantic-ui-react";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";

export default function HabitList({skills}) {
    const skillTrees = skills ? skills.map(skill => {
        return (<SkillTree key={skill._id} skill={skill}/>)
    }) : null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm />
            {skillTrees}
        </Container>
    );
}