import tokenService from "./tokenService"

export default {
    createSkill,
    createSubskill,
    getUserSkills,
    createHabit,
    completeHabit,
    uncompleteHabit,
    deleteSkill,
    deleteSubkill,
    deleteHabit,
    editSkill,
    editSubskill,
    editHabit,
}

const BASE_URL = '/api/skills/'

async function createSkill(data) {

    try {
        console.log(data);
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            body: data, 
            headers: {
            Authorization: `Bearer ${tokenService.getToken()}`
        }
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
        
        throw new Error('Could not complete habit.');
    } catch(err) {
        console.log(err);
    }
}

async function uncompleteHabit(data, habitId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);


    try {
        const response = await fetch(`${BASE_URL}/habit/${habitId}/datesComplete`, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error('Could not uncomplete habit');
    } catch(err) {
        console.log(err);
    }
}

async function deleteSkill(skillId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}${skillId}`, {
            method: 'DELETE',
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not delete skill.');
    } 
}

async function deleteSubkill(subskillId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}subskill/${subskillId}`, {
            method: 'DELETE',
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not delete subskill.');
    } 
}

async function deleteHabit(habitId) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}habit/${habitId}`, {
            method: 'DELETE',
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not delete habit.');
    } 
}

async function editSkill(skillId, data) {
    try {
        const response = await fetch(`${BASE_URL}${skillId}`, {
            method: 'PUT',
            body: data,
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        })
        if (response.ok) return await response.json();
        
        throw new Error('Bad response');
    } catch(err) {
        console.log(err);
        throw new Error('Could not edit skill.');
    }
}

async function editSubskill(subskillId, data) {
    try {
        const response = await fetch(`${BASE_URL}subskill/${subskillId}`, {
            method: 'PUT',
            body: data,
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not edit subskill.');
    }
}

async function editHabit(habitId, data) {
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
        const response = await fetch(`${BASE_URL}habit/${habitId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: header
        })
        if (response.ok) return await response.json();
        
        throw new Error();
    } catch(err) {
        console.log(err);
        throw new Error('Could not edit habit.');
    }
}