import React, {useState, useEffect} from 'react';
import './Bar.css';
import { levelByExperience, experienceThresholdLevel, calculateTotalExperience} from '../../utils/leveling';

export default function Bar({skill, level, tier, color, createNotification}) {

    const experienceNeedForNextLevel = experienceThresholdLevel(level);

    const experienceInCurrentLevel = skill?.experience - calculateTotalExperience(level);

    const width = `${experienceInCurrentLevel/experienceNeedForNextLevel*100}%`


    return(
        <div className='Bar'>
            <div style={{fontWeight: tier ? 300 : 900}}>{skill.name} - Lvl. {level} :&nbsp;</div>
            <div>
                <div className='outer-bar'>
                    <div className={`bar ${tier ? 'subskill' : ''}`} style={{width: width, backgroundColor: color}}></div> 
                </div>
            </div>
        </div>
    );
}