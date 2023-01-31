import tokenService from "./tokenService"

export default {
    createSkill,
    createSubskill,
    getUserSkills,
    createHabit,
    completeHabit,
    uncompleteHabit,
}

const BASE_URL = '/api/skills/'

async function createSkill(data) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

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
        throw new Error('Could not create skill.');
    }
}

async function createSubskill(data, skillId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}${skillId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not create subskill.');
    }
}

async function createHabit(data, skillId, skillLevel) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    const url = `${BASE_URL}${(skillLevel <= 1) ? '' : 'subskill/'}${skillId}/habit`; 

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not create habit.');
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

async function completeHabit(data, habitId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}/habit/${habitId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not create habit.');
    }
}

async function uncompleteHabit(data, habitId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}/habit/${habitId}`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not create habit.');
    }
}