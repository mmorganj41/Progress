import React, {useState, useEffect} from 'react';
import './Bar.css';
import { getSkillLevelColor, experienceThresholdLevel, calculateTotalExperience} from '../../utils/leveling';

export default function Bar({skill, level, tier, color}) {

    const experienceNeedForNextLevel = experienceThresholdLevel(level);

    const experienceInCurrentLevel = skill?.experience - calculateTotalExperience(level);

    const width = `${experienceInCurrentLevel/experienceNeedForNextLevel*100}%`

    const skillColor = getSkillLevelColor(level);

    return(
        <div className='Bar'>
            <div style={{fontWeight: tier ? 300 : 900}}>{skill.name} - <span style={{color: skillColor}}>Lvl. {level}</span> :&nbsp;</div>
            <div>
                <div className='outer-bar'>
                    <div className={`bar ${tier ? 'subskill' : ''}`} style={{width: width, backgroundColor: color}}></div> 
                </div>
            </div>
        </div>
    );
}