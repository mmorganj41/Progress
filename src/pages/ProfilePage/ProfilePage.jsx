import React, {useState, useEffect} from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import userService from '../../utils/userService';
import { Segment, Image, Transition, Header, Button, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'
import Loading from '../../components/Loading/Loading';
import RecentHabits from '../../components/RecentHabits/RecentHabits';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

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


    async function editProfile(data) {
        const newUserData = await userService.editProfile(data);
        setProfileUser(newUserData);
    }

    useEffect(() => {
        getProfile();
    }, [username]);

    if (error) {return(<ErrorMessage error={error} />)}

    return (<>
        
        <div className="ProfilePage MainContent">
            <div className='Col1'>
                <div style={{marginBottom: '25px'}}>
                <Header as='h2' color='teal'>{username}</Header>                    
                <Transition animation='fade right' transitionOnMount unmountOnHide duration={500}>
                    <div>
                    <ProfileCard profileUser={profileUser} editProfile={editProfile} loading={loading}/>
                    </div>
                </Transition>
                </div>
            </div>
            <div className='Col2'>
                <div>
                <Header as='h2'>Last 14 Days</Header>
                <Transition animation='fade left' transitionOnMount unmountOnHide duration={500}>
                <Segment placeholder>
                {loading ? 
                    (<Loading ><Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /></Loading>) :
                    (<RecentHabits habits={habits} />)
                }
                </Segment>
                </Transition>
                </div>
            </div>
        </div>
    </>)
}