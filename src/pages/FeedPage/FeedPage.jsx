import React, {useContext, useState, useEffect, useRef} from 'react';
import { useImmer } from 'use-immer';
import FeedSidebar from '../../components/FeedSidebar/FeedSidebar';
import HabitList from '../../components/HabitList/HabitList';
import { UserContext } from '../../context/UserContext/UserContext';
import { DateContext } from '../../context/DateContext/DateContext';
import skillsService from '../../utils/skillsService';
import { Header, Grid } from 'semantic-ui-react';
import userService from '../../utils/userService';
import './FeedPage.css';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { experienceDictionary, levelByExperience, experienceThresholdLevel, calculateTotalExperience} from '../../utils/leveling';


export default function FeedPage() {
    const [skills, updateSkills] = useImmer(null);
    const loggedUser = useContext(UserContext);
    const [date, setDate] = useState(new Date());

    const [totals, updateTotals] = useImmer({complete: 0, total: 0});

    const levels = [];

    const selectedDate = date || new Date();

    selectedDate.setHours(0,0,0,0);

    function changeDate(e, data) {
        setDate(data.value);
    }

    async function setSkills(array) {
        const data = {skills: array.map(skill => skill._id)}
        console.log(data);
        await userService.reorderSkills(data);
        updateSkills(array);
    }

    async function getSkills() {
        try {
            const response = await skillsService.getUserSkills(loggedUser._id);
            console.log(response)
            updateSkills(response.skills)
        } catch(err) {
            console.log(err);
        }
    }

    function createNotification(type, message) {
        switch (type) {
            case 'complete':
                NotificationManager.info(`You gained ${message?.experience} experience.`, `${message?.habit} complete`, 2000);
                break;
            case 'level up':
                NotificationManager.success('You reached level in.', 'Level Up', 3000, null, true)
        }
    }

    async function createSkill(data) {

        const response = await skillsService.createSkill(data);
        updateSkills(draft => {
            draft.unshift(response.skill)
        });
    }

    async function createSubskill(data, skill, index) {
        const response = await skillsService.createSubskill(data, skill._id);
        updateSkills(draft => {
            draft[index].subskills.unshift(response.subskill)
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
            updateSkills(draft => {
                draft[skillIndex].habits.unshift(response.habit);
            });
        } else {
            updateSkills(draft => {
                draft[skillIndex].subskills[subskillIndex].habits.unshift(response.habit);
            });
        }
    }

    async function completeHabit(data, habit, skillIndex, skillLevel, subskillIndex, habitIndex) {
        try {
            const response = await skillsService.completeHabit(data, habit._id);
            if (skillLevel <= 1) {
                updateSkills(draft => {
                    draft[skillIndex].habits[habitIndex].completionDates[data.date] = true;
                });
            } else {
                updateSkills(draft => {
                    draft[skillIndex].subskills[subskillIndex].habits[habitIndex].completionDates[data.date] = true;
                });
            }
            createNotification('complete', {habit: habit.name, experience: experienceDictionary[habit.difficulty]});
        } catch(err) {
            console.log(err);
        }
    }

    async function uncompleteHabit(data, habit, skillIndex, skillLevel, subskillIndex, habitIndex) {
        try {
            const response = await skillsService.uncompleteHabit(data, habit._id);
            if (skillLevel <= 1) {
                updateSkills(draft => {
                    draft[skillIndex].habits[habitIndex].completionDates[data.date] = false;
                });
            } else {
                updateSkills(draft => {
                    draft[skillIndex].subskills[subskillIndex].habits[habitIndex].completionDates[data.date] = false;
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
                updateSkills(draft => {
                    draft.splice(skillIndex, 1);
                });
            } else {
                await skillsService.deleteSubkill(skill._id);
                updateSkills(draft => {
                    draft[skillIndex].subskills.splice(subskillIndex, 1);
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
                updateSkills(draft => {
                    draft[skillIndex].habits.splice(habitIndex, 1);
                });
            } else {
                updateSkills(draft => {
                    draft[skillIndex].subskills[subskillIndex].habits.splice(habitIndex, 1);
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    async function editSkill(data, skill, skillLevel, skillIndex, subskillIndex) {
        try {
            if (skillLevel <= 1) {
                await skillsService.editSkill(skill._id, data);
                updateSkills(draft => {
                    for (let key in data) {
                        draft[skillIndex][key] = data[key];
                    }
                });
            } else {
                await skillsService.editSubskill(skill._id, data);
                updateSkills(draft => {
                    draft[skillIndex].subskills[subskillIndex].name = data.name;
                });
            }
        } catch(err) {
            console.log(err);
        }
    }

    async function editHabit(data, habit, skillLevel, skillIndex, subskillIndex, habitIndex) {
        const newData = {
            ...data,
            startDate: data.startDate.toISOString().split('T')[0],
            endDate: data.ends ? data.endDate.toISOString().split('T')[0] : null,
        };
        console.log(skillIndex, subskillIndex, habitIndex)
        try {
            if (skillLevel <= 1) {
                await skillsService.editHabit(habit._id, newData);
                updateSkills(draft => {
                    for (let key in newData) {
                        draft[skillIndex].habits[habitIndex][key] = newData[key];
                    }
                });
            } else {
                await skillsService.editHabit(habit._id, newData);
                updateSkills(draft => {
                    for (let key in newData) {
                        draft[skillIndex].subskills[subskillIndex].habits[habitIndex][key] = newData[key];
                    }
                });
            }

        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSkills();
    }, [])

    function makeLevelArray(levels) {
        skills?.forEach(skill => {
            const level = levelByExperience(skill.experience)
        levels.push({
            name: skill.name,
            experience: skill.experience,
            level: level,
            experienceForNextLevel: experienceThresholdLevel(level), 
            experienceForCurrentLevel: skill.experience - calculateTotalExperience(level), 
            color: skill.color,
            tier: 0,
        });
        skill.subskills.forEach(subskill => {
            const subskillLevel = levelByExperience(subskill.experience);
            levels.push({
                name: subskill.name,
                experience: subskill.experience,
                level: subskillLevel,
                experienceForNextLevel: experienceThresholdLevel(subskillLevel), 
                experienceForCurrentLevel: skill.experience - calculateTotalExperience(subskillLevel), 
                color: skill.color,
                tier: 1,
            })
        })
        });
        console.log(levels);
    }

    useEffect(() => {
        makeLevelArray(levels);
        return () => {
            levels.length = 0;
        }
    }, [skills])

    const readableDateString = (date) => {
        return date.toLocaleDateString('en-US', 
            {weekday: 'long',
            year: "numeric",
            month: "long",
            day: "numeric",});
    }

    return (
        <>
        <FeedSidebar levels={levels} totals={totals} skills={skills} date={date} changeDate={changeDate} /> 
        <div className="container" style={{width:'100%'}}>
            
            <Header as="h1">Habits for {readableDateString(selectedDate)}</Header>
            <DateContext.Provider value={selectedDate}>
                <HabitList 
                    skills={skills} 
                    getSkills={getSkills} 
                    createSkill={createSkill}
                    createSubskill={createSubskill}
                    createHabit={createHabit}
                    completeHabit={completeHabit}
                    uncompleteHabit={uncompleteHabit}
                    deleteSkill={deleteSkill}
                    deleteHabit={deleteHabit}
                    editSkill={editSkill}
                    editHabit={editHabit}
                    setSkills={setSkills}
                    totals={totals}
                    updateTotals={updateTotals}
                />
            </DateContext.Provider>
        </div>
        <NotificationContainer></NotificationContainer>
        </>
    )
}