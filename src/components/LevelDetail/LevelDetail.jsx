import React from 'react';
import { getSkillLevelColor } from '../../utils/leveling';

export default function LevelDetail({skill, color, tier, level}) {
    const skillColor = getSkillLevelColor(level);


    return (<div>
            <div style={{color: color}}>
                {tier ? '\t' : ''}{`${skill.name}`}:
            </div>
            <div style={{color: skillColor}}>
                Lvl. {level}
            </div> 
        </div>);
}