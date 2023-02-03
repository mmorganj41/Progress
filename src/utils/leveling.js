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
