import React, {useState, useEffect} from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import userService from '../../utils/userService';
import { Segment, Image, Transition } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'
import Loading from '../../components/Loading/Loading';

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
            <div className='Col1'>
                <Transition animation='fade right' transitionOnMount unmountOnHide duration={500}>
                    <div>
                    <ProfileCard profileUser={profileUser} loading={loading}/>
                    </div>
                </Transition>
            </div>
            <div className='Col2'>
                <Transition animation='fade left' transitionOnMount unmountOnHide duration={500}>
                <Segment placeholder>
                    <Loading ><Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /></Loading>
                </Segment>
                </Transition>
            </div>
        </div>
    </>)
}