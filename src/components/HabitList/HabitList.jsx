import React,{useState, useRef} from "react";
import { Container} from "semantic-ui-react";
import ActionSwitcher from "../ActionSwitcher/ActionSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";
import './HabitList.css';

export default function HabitList({skills, setSkills, createSkill, editSkill, deleteSkill, editHabit, deleteHabit, createSubskill, completeHabit, createHabit, uncompleteHabit}) {
    const [state, setState] = useState('add');

    const dragItem = useRef();
    const dragOverItem = useRef();
    
    const dragStart = (e, position, item) => {
        dragItem.current = {position, item};
    }

    const dragEnter = (e, position, item) => {
        dragOverItem.current = {position, item};
    }

    const drop = (e) => {
        if (dragOverItem.current.item !== dragItem.current.item) return;
        const copySkillList = [...skills];
        const dragItemContent = copySkillList[dragItem.current.position];
        copySkillList.splice(dragItem.current.position, 1);
        copySkillList.splice(dragOverItem.current.position, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setSkills(copySkillList);
        
    }

    const skillTrees = skills ? skills.map((skill, i) => {
        return (<div 
            key={skill._id} 
            onDragStart={(e) => dragStart(e, i, 'skill')}
            onDragEnter={(e) => dragEnter(e, i, 'skill')}
            onDragEnd={drop}
            draggable>

                <SkillTree 
                skill={skill} 
                state={state}
                createSubskill={createSubskill}
                createHabit={createHabit}
                index={i}
                completeHabit={completeHabit}
                uncompleteHabit={uncompleteHabit}
                deleteSkill={deleteSkill}
                deleteHabit={deleteHabit}
                editSkill={editSkill}
                editHabit={editHabit}
            />
        </div>)
    }) : null;

    return (
        <Container style={{maxWidth: 500}}>
            <SearchForm createSkill={createSkill}/>
            <ActionSwitcher state={state} setState={setState}/>
            <div className='HabitList'>
            {skillTrees}
            </div>
        </Container>
    );
}