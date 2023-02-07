import './SkillTree.css';
import React, {useContext, useState, useRef} from "react";
import { Segment,  Image, Icon, Button, Transition } from "semantic-ui-react";
import HabitCard from "../HabitCard/HabitCard";
import { SkillLevelContext } from "../../context/SkillLevelContext/SkillLevelContext";
import CreateSubskillForm from '../CreateSubskillForm/CreateSubskillForm';
import CreateHabitForm from '../CreateHabitForm/CreateHabitForm';
import EditSkillForm from '../EditSkillForm/EditSkillForm';
import { DateContext } from '../../context/DateContext/DateContext';
import { SearchContext } from '../../context/SearchContext/SearchContext';
import useFeedContext from '../../context/FeedContext/FeedContext';

export default function SkillTree({skill, state, index, subskillIndex, parentVisible, dragging, draggedOver, habits }) {
    const [showTree, setShowTree] = useState(true);
    const [showCreateSubskillForm, setShowCreateSubskillForm] = useState(false);
    const [showCreateHabitForm, setShowHabitForm] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const {deleteSkill} = useFeedContext();

    const search = useContext(SearchContext);
    const date = useContext(DateContext);
    const skillLevel = useContext(SkillLevelContext);

    let hasVisibleChildren = false;

    const dateParsed = parseDays(Date.parse(date.toISOString().split('T')[0]));
    const nameMatch = (search ? !!skill.name.match(search)?.[0] : true) || !!parentVisible;

    function parseDays(date) {
        const result = Math.round(date/(1000 * 60 * 60 * 24));
        return result;
    }

    const subskillList = skill?.subskills ? skill.subskills.map((subskill, i) => {
        if (nameMatch || subskill.name.match(search)) {
            hasVisibleChildren = true;
        } 
        const subskillCopy = {...subskill}
        subskillCopy.color = skill.color;

        const habitList = generateHabitList(subskill);

        return (<div key={subskill._id}>
            <SkillTree     
                state={state} 
                index={index} 
                subskillIndex={i}
                skill={subskillCopy}      
                parentVisible={hasVisibleChildren}
                habits={habitList}
        /></div>);
    }) : null; 

    const habitList = habits ? habits : generateHabitList(skill);

    function generateHabitList(skill) {
        return skill?.habits ? skill.habits.map((habit, i) => {
            let applicable = false;
            
            const startDateParsed = parseDays(Date.parse(habit.startDate));
            if (habit.endDate && dateParsed > parseDays(Date.parse(habit.endDate))) {
            } else if (habit.repeatDays) {
                if (dateParsed < startDateParsed || (dateParsed - startDateParsed) % habit.repeatDays) {
                } else {
                    applicable = true;
                }
            } else if (dateParsed === startDateParsed) {
                applicable = true;
        }

        if (applicable && !habit.name.match(search) && !nameMatch) applicable = false;
        if (applicable) {
            hasVisibleChildren = true;
        }

        if (!showTree) applicable = false;
        return (
            <Transition key={habit._id} visible={applicable} duration={250} animation='fade down' transitionOnMount unmountOnHide>
                <HabitCard 
                    key={habit._id} 
                    habit={habit} 
                    color={skill?.color} 
                    state={state} 
                    index={index} 
                    subskillIndex={subskillIndex} 
                    habitIndex={i}
                />
            </Transition>);       
    }) : null;
    }

    function handleCreateSubskill(e) {
        e.stopPropagation();
        setShowCreateSubskillForm(!showCreateSubskillForm);
    }

    function handleCreateHabit(e) {
        e.stopPropagation();
        setShowHabitForm(!showCreateHabitForm);
    }

    function handleShowEdit(e) {
        if (e) e.stopPropagation();
        setShowEdit(!showEdit);
    }

    function alwaysShowTree() {
        setShowTree(true)
    }

    function hideSubskillCreateForm() {
        setShowCreateSubskillForm(false);
    }

    function hideCreateHabitForm() {
        setShowHabitForm(false);
    }

    function handleShowTree(e) {
        if (['INPUT', 'LABEL', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return
        setShowTree(!showTree);
    }

    async function handleDelete(e) {
        e.stopPropagation();
        if (window.confirm('Are you sure you wish to delete this item?')) {
            await deleteSkill(skill, skillLevel, index, subskillIndex);
        }
    }

    const title = () => {
        if (skillLevel < 1) {
            return(
                <>
                    <Image src={skill.photoUrl ? skill.photoUrl : "https://i.imgur.com/2o8gKIA.png"} rounded size='mini' />
                    <h3>&nbsp;{skill?.name}</h3>
                </>) 
        }
        
        return (<h5>{skill?.name}</h5>)
    }

    const actionPanel = () => {
        if (state === 'add') {
            return (<>
                <div className='SkillTree header'>
                    {title()}
                    <div>
                    {skillLevel <1 ?
                    <Button animated='vertical' onClick={handleCreateSubskill}>
                    <Button.Content hidden>Subskill</Button.Content>
                    <Button.Content visible><Icon name={showCreateSubskillForm ? "minus circle" : "plus circle"}  size="large"/></Button.Content>
                    </Button> : null}
                    <Button animated='vertical' onClick={handleCreateHabit}> 
                    <Button.Content hidden>Habit</Button.Content>
                    <Button.Content visible><Icon inverted name={showCreateHabitForm ? "minus circle" : "plus circle"}  size="large"/></Button.Content>
                    </Button>
                    </div>
                </div>
            </>)
        } else if (state === 'edit') {
            if (showEdit) {
                return(
                    <EditSkillForm handleShowEdit={handleShowEdit} skill={skill} index={index} subskillIndex={subskillIndex}/>
                )
            } else {
                return(
                <div className='SkillTree header'>
                    {title()}
                    <div>
                        <Button icon onClick={handleShowEdit}>
                            <Icon name="dot circle" onClick={handleShowEdit} size="large"/>
                        </Button>
                    </div>
                </div>) 
            }
        } else if (state === 'delete') {
            return(
                <div className='SkillTree header'>
                    {title()}
                    <Button icon onClick={handleDelete}>
                        <Icon name="remove circle" size="large"/>
                    </Button>
                </div>) 
        } else {
            return(
                <div className='SkillTree header default'>
                    {title()}
                </div>) 
        }
    }

    let visible = hasVisibleChildren || nameMatch || parentVisible

    return(
        
        <SkillLevelContext.Provider value={skillLevel + 1}>
            <Transition duration={250} animation='fade down' transitionOnMount visible={visible}>
                <Segment inverted={draggedOver} disabled={dragging} className={`SkillTree main ${skillLevel >= 1 && 'borderless'}`}>
                    <Segment className={skillLevel >= 1 ? 'subskill' : ''} inverted color={skill?.color} onClick={handleShowTree}>
                        {actionPanel()}
                    </Segment>
                    {showCreateHabitForm && (state === 'add') ? <CreateHabitForm showTree={alwaysShowTree} hideForm={hideCreateHabitForm} skill={skill} index={index} subskillIndex={subskillIndex}/> : null }
                    {habitList}
                    {showCreateSubskillForm && (state === 'add') && skillLevel < 1 ? <CreateSubskillForm draggedOver={draggedOver} disabled={dragging} showTree={alwaysShowTree} hideForm={hideSubskillCreateForm} index={index} skill={skill}/> : null}
                    {subskillList}
                    
                </Segment>
            </Transition>
        </SkillLevelContext.Provider>
        
    )
}