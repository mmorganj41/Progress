import tokenService from "./tokenService"

export default {
    createSkill,
    getUserSkills
}

const BASE_URL = '/api/skills/'

async function createSkill(data) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    console.log(data);
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header
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