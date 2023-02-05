import React from 'react';

export default function LevelDetail({skill, color, tier, level}) {
    let skillColor;

        switch (true) {
        case (level > 100): 
            skillColor = '#e6cc80'
            break;
        case (level > 50): 
            skillColor = '#ff8000'
            break;
        case (level > 35): 
            skillColor = '#a335ee'
            break;
        case (level > 20): 
            skillColor = '#0070dd'
            break;
        case (level > 11): 
            skillColor = '#1eff00'
            break;
        case (level > 5): 
            skillColor = '#ffffff'
            break;
        default: 
            skillColor = '#9d9d9d'
            break;
    }

    return (<div>
            <div style={{color: color}}>
                {tier ? '\t' : ''}{`${skill.name}`}:
            </div>
            <div style={{color: skillColor}}>
                Lvl. {level}
            </div> 
        </div>);
}