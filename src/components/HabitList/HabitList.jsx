import React,{useState, useRef} from "react";
import { Container} from "semantic-ui-react";
import ActionSwitcher from "../ActionSwitcher/ActionSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";
import './HabitList.css';
import Masonry from "react-masonry-css";

export default function HabitList({skills, setSkills, createSkill, editSkill, deleteSkill, editHabit, deleteHabit, createSubskill, completeHabit, createHabit, uncompleteHabit}) {
    const [state, setState] = useState('add');
    const [search, setSearch] = useState('');
    const [dragging, setDragging] = useState({dragged: null, dragOver: null});

    
    const dragStart = (e, position) => {
        setDragging({...dragging, dragged: position})
    }

    const dragEnter = (e, position) => {
        setDragging({...dragging, dragOver: position})

    }

    const drop = async (e) => {
        e.stopPropagation();
        const copySkillList = [...skills];
        const dragItemContent = copySkillList[dragging.dragged];
        copySkillList.splice(dragging.dragged, 1);
        copySkillList.splice(dragging.dragOver, 0, dragItemContent);
        setDragging({dragged: null, dragOver: null});
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
                dragging={dragging.dragged === i}
                draggedOver={dragging.dragOver === i}
            />
        </div>)
    }) : null;

    return (
        <Container>
            <SearchForm createSkill={createSkill} search={search} setSearch={setSearch}/>
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