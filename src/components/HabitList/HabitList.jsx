import React,{useState, useRef} from "react";
import { Container} from "semantic-ui-react";
import ActionSwitcher from "../ActionSwitcher/ActionSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";
import './HabitList.css';
import Masonry from "react-masonry-css";

export default function HabitList({skills, setSkills, createSkill, editSkill, deleteSkill, editHabit, deleteHabit, createSubskill, completeHabit, createHabit, uncompleteHabit}) {
    const [state, setState] = useState('add');

    const dragItem = useRef();
    const dragOverItem = useRef();
    
    const dragStart = (e, position, item) => {
        dragItem.current = {position, item};
    }

    const dragEnter = (e, position, item) => {
        if (dragItem.current.item === item) {
            dragOverItem.current = {position, item};
        }
    }

    const drop = async (e) => {
        e.stopPropagation();
        if (dragOverItem.current.item !== dragItem.current.item) return;
        const copySkillList = [...skills];
        const dragItemContent = copySkillList[dragItem.current.position];
        copySkillList.splice(dragItem.current.position, 1);
        copySkillList.splice(dragOverItem.current.position, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        await setSkills(copySkillList);
        
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
                dragEnter={dragEnter}
            />
        </div>)
    }) : null;

    return (
        <Container>
            <SearchForm createSkill={createSkill} />
            <ActionSwitcher state={state} setState={setState}/>
                <Masonry 
                    breakpointCols={{default: 2, 1500: 1}}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                {skillTrees}
                </Masonry>
        </Container>
    );
}