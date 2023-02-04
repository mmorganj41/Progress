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