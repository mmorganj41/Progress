import React, {useContext} from 'react';
import { UserContext } from '../../context/UserContext/UserContext';
import {Card, Image, Icon, Header, Button} from 'semantic-ui-react';
import { levelByExperience } from '../../utils/leveling';
import LevelDetail from '../LevelDetail/LevelDetail';
import './ProfileCard.css'
import BasicLoader from '../BasicLoader/BasicLoader';

export default function ProfileCard({profileUser, loading}) {
    const user = useContext(UserContext);
    let icon;

    const levels = [];
    let totalLevels;

    profileUser.skills?.forEach(skill => {
        const level = levelByExperience(skill.experience);
        levels.push(<LevelDetail skill={skill} color={skill.color} key={`skill-${skill._id}`} level={level} tier={0} />);
        totalLevels += (level - 1);
        skill.subskills?.forEach(subskill => {
            const subskillLevel = levelByExperience(subskill.experience);
            levels.push(<LevelDetail skill={subskill} color={skill.color} key={`subskill-${subskill._id}`} level={subskillLevel} tier={1} />);
        
        })
    })

    switch (true) {
        case (totalLevels > 200): 
            icon = 'chess king'
            break;
        case (totalLevels > 125): 
            icon = 'chess queen'
            break;
        case (totalLevels > 75): 
            icon = 'chess rook'
            break;
        case (totalLevels > 40): 
            icon = 'chess bishop'
            break;
        case (totalLevels > 15): 
            icon = 'chess knight'
            break;
        default: 
            icon = 'chess pawn'
            break;
    }

    if (loading) {
        return (
        <Card>
          <Image src='https://i.imgur.com/tdi3NGa.png' wrapped ui={false}>
            
          </Image>
          <Card.Content>
          
            <Card.Header>Email</Card.Header>
            <Card.Meta>
              <span className='date'>Joined date</span>
            </Card.Meta>
            
            <Card.Description>
                <BasicLoader />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Header as='h5'>
              <Icon name={icon} />
              Skills
              
            </Header>
                <BasicLoader />
          </Card.Content>
        </Card>
        )
    }

    return (
        <Card>
            {user.username === profileUser.username ? 
            (<Button attached='top' icon>
                <Icon name='setting'></Icon>
            </Button>) : null}
          <Image src={profileUser?.photoUrl ? profileUser.photUrl : 'https://i.imgur.com/tdi3NGa.png'} wrapped ui={false}>
            
          </Image>
          <Card.Content>
          
            <Card.Header>{profileUser?.email}</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in {profileUser?.createdAt?.split('T')[0]}</span>
            </Card.Meta>
            
            <Card.Description>
              {profileUser?.bio ? profileUser.bio : 'Looks like their biography is empty.'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Header as='h5'>
              <Icon name={icon} />
              Skills
              
            </Header>
            <div className="ProfileCard SkillList">
                {levels}
              </div>
          </Card.Content>
        </Card>
      )
}