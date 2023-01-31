import React, {useContext, useState, useEffect} from 'react';
import HabitList from '../../components/HabitList/HabitList';
import { UserContext } from '../../context/UserContext/UserContext';
import skillsService from '../../utils/skillsService';


export default function FeedPage() {
    const [skills, setSkills] = useState(null);
    const loggedUser = useContext(UserContext);

    async function getSkills() {
        try {
            const response = await skillsService.getUserSkills(loggedUser._id);
            setSkills(response.skills)
        } catch(err) {
            console.log(err);
        }
    }

    async function createSkill(formState) {
        const response = await skillsService.createSkill(formState);
        setSkills([response.skill, ...skills]);
    }

    async function createSubskill(formState, skill) {
        const response = await skillsService.createSubskill(formState, skill._id);
    }

    async function createHabit(formState, skill, skillLevel) {
        const response = await skillsService.createHabit(formState, skill._id, skillLevel)
    }

    useEffect(() => {
        getSkills();
    }, [])

    return (<HabitList 
        skills={skills} 
        getSkills={getSkills} 
        createSkill={createSkill}
        createSubskill={createSubskill}
        createHabit={createHabit}
        />);
}