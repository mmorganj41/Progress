import React, {useContext, useState, useEffect} from 'react';
import { useImmer, useImmerReducer } from 'use-immer';
import FeedSidebar from '../../components/FeedSidebar/FeedSidebar';
import HabitList from '../../components/HabitList/HabitList';
import { UserContext } from '../../context/UserContext/UserContext';
import { DateContext } from '../../context/DateContext/DateContext';
import skillsService from '../../utils/skillsService';
import { Header } from 'semantic-ui-react';
import userService from '../../utils/userService';
import './FeedPage.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {experienceDictionary, levelByExperience} from '../../utils/leveling';
import { readableDateString } from '../../utils/date';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FeedContext } from '../../context/FeedContext/FeedContext';

export default function FeedPage() {
    const [skills, dispatch] = useImmerReducer(skillsReducer, null);

    const loggedUser = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    console.log(skills, '<====skillls');
    const [totals, updateTotals] = useImmer({complete: 0, total: 0});

    const selectedDate = date || new Date();

    selectedDate.setHours(0,0,0,0);

    function changeDate(data) {
        setDate(data);
    }

    async function setSkills(array) {
        const data = {skills: array.map(skill => skill._id)}
        await userService.reorderSkills(data);
        dispatch({
            type: 'set',
            data: array,
        })
    }

    async function getSkills() {
        try {
            const response = await skillsService.getUserSkills(loggedUser._id);
            dispatch({
                type: 'get',
                data: response.skills,
            });
        } catch(err) {
            console.log(err);
            setError('Error loading skills');
        }
    }

    function createNotification(type, message) {
        switch (type) {
            case 'complete':
                NotificationManager.info(`You gained ${message?.experience} experience.`, `${message?.habit} complete`, 2000);
                break;
            case 'level up':
                NotificationManager.success(`You reached level ${message?.level} in ${message?.skill}.`, 'Level Up', 3000, null, true);
                break;
        }
    }

    async function createSkill(data) {
        const response = await skillsService.createSkill(data);
        dispatch({
            type: 'createSkill',
            data: response.skill,
        })
    }

    async function createSubskill(data, skill, index) {
        const response = await skillsService.createSubskill(data, skill._id);
        dispatch({
            type: 'createSubskill',
            index, 
            data: response.subskill,
        });
    }

    async function createHabit(data, skill, skillIndex, skillLevel, subskillIndex) {
        const newData = {
            ...data,
            startDate: data.startDate.toISOString().split('T')[0],
            endDate: data.ends ? data.endDate.toISOString().split('T')[0] : null,
        };
        const response = await skillsService.createHabit(newData, skill._id, skillLevel)
        if (skillLevel <= 1) {
            dispatch({
                type: 'createHabitSkill',
                index: skillIndex,
                data: response.habit,
            });
        } else {
            dispatch({
                type: 'createHabitSubskill',
                index: skillIndex,
                subskillIndex,
                data: response.habit,
            });
        }
    }

    async function completeHabit(data, habit, skillIndex, skillLevel, subskillIndex, habitIndex) {
        try {
            let levelUp = 0;
            let levelUpSubskill = 0;
            const response = await skillsService.completeHabit(data, habit._id);
            if (skillLevel <= 1) {
                if (levelByExperience(skills[skillIndex].experience) < levelByExperience(skills[skillIndex].experience + experienceDictionary[habit.difficulty])) {
                    levelUp = levelByExperience(skills[skillIndex].experience + experienceDictionary[habit.difficulty]);
                }
                dispatch({
                    type: 'completeHabitSkill',
                    index: skillIndex,
                    habitIndex,
                    data: data.date,
                    difficulty: habit.difficulty,
                });
            } else {
                if (levelByExperience(skills[skillIndex].experience) < levelByExperience(skills[skillIndex].experience + experienceDictionary[habit.difficulty])) {
                    levelUp = levelByExperience(skills[skillIndex].experience + experienceDictionary[habit.difficulty]);
                }
                if (levelByExperience(skills[skillIndex].subskills[subskillIndex].experience) < levelByExperience(skills[skillIndex].subskills[subskillIndex].experience + experienceDictionary[habit.difficulty])) {
                    levelUpSubskill = levelByExperience(skills[skillIndex].subskills[subskillIndex].experience + experienceDictionary[habit.difficulty]);
                }
                dispatch({
                    type: 'completeHabitSubskill',
                    index: skillIndex,
                    subskillIndex,
                    habitIndex,
                    data: data.date,
                    difficulty: habit.difficulty,
                });
            }
            createNotification('complete', {habit: habit.name, experience: experienceDictionary[habit.difficulty]});
            if (levelUp) createNotification('level up', {skill: skills[skillIndex].name, level: levelUp});
            if (levelUpSubskill) createNotification('level up', {skill: skills[skillIndex].subskills[subskillIndex].name, level: levelUpSubskill});
        } catch(err) {
            console.log(err);
        }
    }

    async function uncompleteHabit(data, habit, skillIndex, skillLevel, subskillIndex, habitIndex) {
        try {
            const response = await skillsService.uncompleteHabit(data, habit._id);
            if (skillLevel <= 1) {
                dispatch({
                    type: 'uncompleteHabitSkill',
                    index: skillIndex,
                    habitIndex,
                    data: data.date,
                    difficulty: habit.difficulty,
                });
            } else {
                dispatch({
                    type: 'uncompleteHabitSubkill',
                    index: skillIndex,
                    subskillIndex,
                    habitIndex,
                    data: data.date,
                    difficulty: habit.difficulty,
                });
            }
        } catch(err) {
            console.log(err);
        }
    }
    
    async function deleteSkill(skill, skillLevel, skillIndex, subskillIndex) {
        try {
            if (skillLevel < 1) {
                await skillsService.deleteSkill(skill._id);
                dispatch({
                    type: 'deleteSkill',
                    index: skillIndex,
                });
            } else {
                await skillsService.deleteSubkill(skill._id);
                dispatch({
                    type: 'deleteSubskill',
                    index: skillIndex,
                    subskillIndex
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    async function deleteHabit(habit, skillLevel, skillIndex, subskillIndex, habitIndex) {
        try {
            await skillsService.deleteHabit(habit._id);
            if (skillLevel <= 1) {
                dispatch({
                    type: 'deleteHabitSkill',
                    index: skillIndex,
                    habitIndex,
                });
            } else {
                dispatch({
                    type: 'deleteHabitSubskill',
                    index: skillIndex,
                    subskillIndex,
                    habitIndex,
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    async function editSkill(data, skill, skillLevel, skillIndex, subskillIndex) {
        try {
            if (skillLevel <= 1) {
                const response = await skillsService.editSkill(skill._id, data);
                dispatch({
                    type: 'editSkill',
                    index: skillIndex,
                    data,
                    photoUrl: response.skill.photoUrl,
                });
            } else {
                await skillsService.editSubskill(skill._id, data);
                dispatch({
                    type: 'editSubskill',
                    index: skillIndex,
                    subskillIndex,
                    data,
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    async function editHabit(data, habit, skillLevel, skillIndex, subskillIndex, habitIndex) {
        const newData = {
            ...data,
            endDate: data.ends ? data.endDate : null,
        };
        console.log(skillIndex, subskillIndex, habitIndex)
        try {
            if (skillLevel <= 1) {
                await skillsService.editHabit(habit._id, newData);
                dispatch({
                    type: 'editHabitSkill',
                    index: skillIndex,
                    habitIndex,
                    data: newData,                    
                });
            } else {
                await skillsService.editHabit(habit._id, newData);
                dispatch({
                    type: 'editHabitSubskill',
                    index: skillIndex,
                    subskillIndex,
                    habitIndex,
                    data: newData,                    
                });
            }

        } catch(err) {
            console.log(err);
        }
    }
  
    useEffect(() => {
        getSkills();
        setLoading(false);
    }, []);

    if (error) return (<ErrorMessage error={error} />);

    return (
        <FeedContext.Provider value={{
            totals:totals, 
            skills:skills,
            date:date,
            changeDate:changeDate,
            createNotification:createNotification,
            loading:loading,
            skills:skills, 
            getSkills:getSkills, 
            createSkill:createSkill,
            createSubskill:createSubskill,
            createHabit:createHabit,
            completeHabit:completeHabit,
            uncompleteHabit:uncompleteHabit,
            deleteSkill:deleteSkill,
            deleteHabit:deleteHabit,
            editSkill:editSkill,
            editHabit:editHabit,
            setSkills:setSkills,
            updateTotals:updateTotals,
        }}>
            <FeedSidebar /> 
            <div className="container" style={{width:'100%'}}>
                
                <Header as="h1">Habits for  
                    <span style={{color: '#008080', textDecoration: 'underline'}}> {readableDateString(selectedDate)}</span>
                </Header>
                <DateContext.Provider value={selectedDate}>
                    <HabitList />
                </DateContext.Provider>
            </div>
            <NotificationContainer></NotificationContainer>
        </FeedContext.Provider>
    )
}

function skillsReducer(draft, action) {
    switch (action.type){ 
        case 'set': {
            return action.data;
        } 
        case 'get': {
            return action.data;
        }
        case 'createSkill': {
            draft.unshift(action.data);
            break;
        }
        case 'createSubskill': {
            draft[action.index].subskills.unshift(action.data);
            break;
        }
        case 'createHabitSkill': {
            draft[action.index].habits.unshift(action.data);
            break;
        }
        case 'createHabitSubskill': {
            draft[action.index].subskills[action.subskillIndex].habits.unshift(action.data);
            break;
        }
        case 'completeHabitSkill': {
            draft[action.index].habits[action.habitIndex].completionDates[action.data] = true;
            draft[action.index].experience += experienceDictionary[action.difficulty];
            break;
        }
        case 'completeHabitSubskill': {
            draft[action.index].subskills[action.subskillIndex].habits[action.habitIndex].completionDates[action.data] = true;
            draft[action.index].experience += experienceDictionary[action.difficulty];
            draft[action.index].subskills[action.subskillIndex].experience += experienceDictionary[action.difficulty];
            break;
        }
        case 'uncompleteHabitSkill': {
            draft[action.index].habits[action.habitIndex].completionDates[action.data] = false;
            draft[action.index].experience -= experienceDictionary[action.difficulty];
            break;
        }
        case 'uncompleteHabitSubskill': {
            draft[action.index].subskills[action.subskillIndex].habits[action.habitIndex].completionDates[action.data] = false;
            draft[action.index].experience -= experienceDictionary[action.difficulty];
            draft[action.index].subskills[action.subskillIndex].experience -= experienceDictionary[action.difficulty];
            break;
        }
        case 'deleteSkill': {
            draft.splice(action.index, 1);
            break;
        }
        case 'deleteSubskill': {
            draft[action.index].subskills.splice(action.subskillIndex, 1);
            break;
        }
        case 'deleteHabitSkill': {
            draft[action.index].habits.splice(action.habitIndex, 1);
            break;
        }
        case 'deleteHabitSubskill': {
            draft[action.index].subskills[action.subskillIndex].habits.splice(action.habitIndex, 1);
            break;
        }
        case 'editSkill': {
            for (let key of action.data.keys()) {
                if (key === 'photo') {
                    draft[action.index].photoUrl = action.photoUrl
                } else {
                    draft[action.index][key] = action.data.get(key);
                }
            }
            break;
        }
        case 'editSubskill': {
            draft[action.index].subskills[action.subskillIndex].name = action.data.get('name');
            break;
        }
        case 'editHabitSkill': {
            for (let key in action.data) {
                draft[action.index].habits[action.habitIndex][key] = action.data[key];
            }
            break;
        }
        case 'editHabitSubskill': {
            for (let key in action.data) {
                draft[action.index].subskills[action.subskillIndex].habits[action.habitIndex][key] = action.data[key];
            }
            break;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}