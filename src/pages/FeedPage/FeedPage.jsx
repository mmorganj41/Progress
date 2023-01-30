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

    useEffect(() => {
        getSkills();
    }, [])

    return (<HabitList skills={skills} getSkills={getSkills}/>);
}