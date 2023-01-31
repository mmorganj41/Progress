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
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('You have already used that skill name.');
    }
}

async function getUserSkills(userId) {
    try {
        const response = await fetch(`${BASE_URL}user/${userId}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        });
        if (response.ok) return await response.json();

        
    } catch(err) {
        console.log(err);
        throw new Error('Could not render user skills');
    }
}