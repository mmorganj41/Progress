import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import { levelByExperience, getTotalLevelIcon } from '../../utils/leveling';
import Bar from '../Bar/Bar';
import useFeedContext from '../../context/FeedContext/FeedContext';

export default function ExperienceGraph() {
    const {skills} = useFeedContext();
    const bars = [];
    let totalLevels = 0;

    skills?.forEach(skill => {
        const level = levelByExperience(skill.experience);
        bars.push(<Bar skill={skill} color={skill.color} key={`skill-${skill._id}`} tier={0} level={level}/>);

        totalLevels += (level-1);

        skill.subskills?.forEach(subskill => {
            const subskillLevel = levelByExperience(subskill.experience);
            bars.push(<Bar skill={subskill} color={skill.color} key={`subskill-${subskill._id}`} level={subskillLevel} tier={1}/>);
        })
    });

    const icon = getTotalLevelIcon(totalLevels);

    return (<Segment>
        <Icon name={icon} size='big'></Icon>
        {bars}
    </Segment>)
}