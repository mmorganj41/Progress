import React, {useContext, useState, useEffect} from 'react';
import { useImmer } from 'use-immer';
import FeedSidebar from '../../components/FeedSidebar/FeedSidebar';
import HabitList from '../../components/HabitList/HabitList';
import { UserContext } from '../../context/UserContext/UserContext';
import { DateContext } from '../../context/DateContext/DateContext';
import skillsService from '../../utils/skillsService';
import { Header } from 'semantic-ui-react';


export default function FeedPage() {
    const [skills, updateSkills] = useImmer(null);
    const loggedUser = useContext(UserContext);
    const [date, setDate] = useState(null);

    function dateToday() {
        const date = new Date();
        return date.toISOString().split('T')[0];
    }

    const selectedDate = date || dateToday();

    async function getSkills() {
        try {
            const response = await skillsService.getUserSkills(loggedUser._id);
            console.log(response)
            updateSkills(response.skills)
        } catch(err) {
            console.log(err);
        }
    }

    async function createSkill(formState) {
        const response = await skillsService.createSkill(formState);
        updateSkills(draft => {
            draft.unshift(response.skill)
        });
    }

    async function createSubskill(formState, skill, index) {
        const response = await skillsService.createSubskill(formState, skill._id);
        updateSkills(draft => {
            draft[index].subskills.unshift(response.subskill)
        });
    }

    async function createHabit(formState, skill, skillIndex, skillLevel, subskillIndex) {
        const response = await skillsService.createHabit(formState, skill._id, skillLevel)
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

    useEffect(() => {
        getSkills();
    }, [])

    return (
        <div className="container">
            <FeedSidebar date={date} setDate={setDate}/>
            <Header>{selectedDate}</Header>
            <DateContext.Provider value={selectedDate}>
                <HabitList 
                skills={skills} 
                getSkills={getSkills} 
                createSkill={createSkill}
                createSubskill={createSubskill}
                createHabit={createHabit}
                completeHabit={completeHabit}
                uncompleteHabit={uncompleteHabit}
                />
            </DateContext.Provider>
        </div>
    )
}