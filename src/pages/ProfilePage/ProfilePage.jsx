import React, {useState, useEffect} from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import userService from '../../utils/userService';
import { Segment } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'

export default function ProfilePage() {
    const [profileUser, setProfileUser] = useState({});
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { username } = useParams();

    async function getProfile() {
        try {
            const response = await userService.getProfile(username);
            setLoading(false);
            setProfileUser(response.user);
            setHabits(response.data);
        } catch(err) {
            setLoading(false);
            setError("Profile does not exist");
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (<>
        <h1>{profileUser?.username}</h1>
        <div className="ProfilePage MainContent">
            <div>
                <ProfileCard profileUser={profileUser} />
            </div>
            <div>
                <Segment placeholder>

                </Segment>
            </div>
        </div>
    </>)
}