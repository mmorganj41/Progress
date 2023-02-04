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
    const nextLevel = level+1;
    return Math.max((nextLevel ** 2 - nextLevel) * 50 / 2, 0);
}

const totalExperienceArray = [0];

export function calculateTotalExperience(level) {
    let index = level - 1;
    if (typeof totalExperienceArray[index] !== 'undefined') {
        return totalExperienceArray[index];
    } else {
        let max_index = totalExperienceArray.length - 1;
        while (max_index < index) {
            let max_value = totalExperienceArray[max_index];
            totalExperienceArray.push(max_value + experienceThresholdLevel(max_value+1));
            max_index ++
        }
        return totalExperienceArray[index];
    }
    
}