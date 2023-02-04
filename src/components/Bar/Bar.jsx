import React from 'react';
import './Bar.css';

export default function Bar({skill}) {

    const width = `${skill.experienceForCurrentLevel/skill.experienceForNextLevel*100}%`


    return(
        <div className='Bar'>
            <div style={{fontWeight: skill.tier ? 300 : 900}}>{skill.name} - Lvl. {skill.level} :&nbsp;</div>
            <div>
                <div className='outer-bar'>
                    <div className={`bar ${skill.tier ? 'subskill' : ''}`} style={{width: width, backgroundColor: skill.color}}></div> 
                </div>
            </div>
        </div>
    );
}