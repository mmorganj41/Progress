import React from 'react';
import { Message, Image } from 'semantic-ui-react';
import { levelByExperience } from '../../utils/leveling';
import { getSkillLevelColor } from '../../utils/leveling';
import { useNavigate } from 'react-router-dom';

export default function SearchItem({user}) {
    const highestSkill = user.skills.length ? user.skills.reduce((max, skill) => max.experience > skill.experience ? max : skill) : 0;
    const level = levelByExperience(highestSkill?.experience);
    const color = getSkillLevelColor(level);

    const navigate = useNavigate();

    console.log(highestSkill);
    return (
        <div style={{textAlign: 'left', cursor: 'pointer'}} onClick={() => navigate(`/user/${user?.username}`)}>
            <Message>
                <Image verticalAlign='middle' floated='left' src={user?.photoUrl ? user.photoUrl : 'https://i.imgur.com/tdi3NGa.png'} avatar />
                <Message.Header>{user?.username}</Message.Header>
                <Message.Content><span style={{color}}>{level ? `${highestSkill.name}: Lvl. ${level}` : null}</span></Message.Content>
                <Message.Content>{user?.bio ? user.bio : 'No bio'}</Message.Content>
            </Message>
        </div>
    )
}