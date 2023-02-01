import React,{useState} from "react";
import { Container} from "semantic-ui-react";
import ActionSwitcher from "../ActionSwitcher/ActionSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";

export default function HabitList({skills, createSkill, createSubskill, completeHabit, createHabit, uncompleteHabit}) {
    const [state, setState] = useState('add');
    
    const skillTrees = skills ? skills.map((skill, i) => {
        return (<SkillTree 
            key={skill._id} 
            skill={skill} 
            state={state}
            createSubskill={createSubskill}
            createHabit={createHabit}
            index={i}
            completeHabit={completeHabit}
            uncompleteHabit={uncompleteHabit}
        />)
    }) : null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm createSkill={createSkill}/>
            <ActionSwitcher state={state} setState={setState}/>
            {skillTrees}
        </Container>
    );
}