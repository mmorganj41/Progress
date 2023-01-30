import React from "react";
import { Container } from "semantic-ui-react";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";

export default function HabitList() {
    const skillTrees = null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm />
            <SkillTree />
            {skillTrees}
        </Container>
    );
}