import tokenService from "./tokenService"

export default {
    createSkill,
    getUserSkills
}

const BASE_URL = '/api/skills/'

async function createSkill(data) {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            body: data,
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        })
        return await response.json();
    } catch(err) {
        console.log(err);
        throw new Error('Could not create skill');
    }
}

async function getUserSkills(userId) {
    try {
        const response = await fetch(`${BASE_URL}${userId}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        });
        return await response.json();
    } catch(err) {
        console.log(err);
        throw new Error('Could not render user skills');
    }
}