import React,{useState, useRef, useContext} from "react";
import { Container, Segment} from "semantic-ui-react";
import ActionSwitcher from "../ActionSwitcher/ActionSwitcher";
import SearchForm from "../SearchForm/SearchForm";
import SkillTree from "../SkillTree/SkillTree";
import './HabitList.css';
import Masonry from "react-masonry-css";
import { SearchContext } from "../../context/SearchContext/SearchContext";
import CreateSkillForm from "../CreateSkillForm/CreateSkillForm";
import Loading from "../Loading/Loading";
import useFeedContext from "../../context/FeedContext/FeedContext";

export default function HabitList() {
    const [state, setState] = useState('default');
    const [search, setSearch] = useState('');
    const [dragging, setDragging] = useState({dragged: null, dragOver: null});
    const [showCreateSkillForm, setCreateSkillShowForm] = useState(false);
    const {loading, skills, setSkills } = useFeedContext();
    
    function handleCreateSkillFormShow(e) {
        e.preventDefault();
        setCreateSkillShowForm(!showCreateSkillForm);
    }


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
        return (
                <div 
                key={skill._id} 
                onDragStart={(e) => dragStart(e, i, 'skill')}
                onDragEnter={(e) => dragEnter(e, i, 'skill')}
                onDragEnd={drop}
                draggable>
                    <SkillTree
                        key={skill._id}
                        skill={skill}
                        state={state}
                        index={i}
                        dragEnter={dragEnter}
                        dragging={dragging.dragged === i}
                        draggedOver={dragging.dragOver === i}  
                        parentVisible={false}  
                    />
            </div>)
    }) : null;

    return (
        <Container>
            <SearchForm showCreateSkillForm={showCreateSkillForm} handleCreateSkillFormShow={handleCreateSkillFormShow} search={search} setSearch={setSearch}/>
            <ActionSwitcher state={state} setState={setState}/>
            <div>
            <SearchContext.Provider value={search ? new RegExp(search, 'i') : ''}>
            {loading ?  
                <Segment placeholder>
                    <Loading />
                </Segment> 
                :
                <Masonry 
                    breakpointCols={{default: 2, 1500: 1}}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                    >
                    {showCreateSkillForm && <CreateSkillForm handleCreateSkillFormShow={handleCreateSkillFormShow}/>}
                    {skillTrees}
                </Masonry>
                }
            </SearchContext.Provider>
            </div>
        </Container>
    );
}