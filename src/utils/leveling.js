export const experienceDictionary = {
    trivial: 10,
    easy: 15,
    average: 25,
    challenging: 40,
    difficult: 60, 
}

export function levelByExperience(experience) {
    return Math.floor((1+Math.sqrt(1+8*experience/50))/2);
}

export function experienceThresholdLevel(level) {
    return level*50;
}


export function calculateTotalExperience(level) {
    return (level ** 2 - level) * 50 /2;
}

export function getTotalLevelIcon(totalLevels) {
    let icon;
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
    return icon;
}

export function getSkillLevelColor(level) {
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
    return skillColor;
}