import tokenService from "./tokenService"

export default {
    createSkill
}

const BASE_URL = '/api/skills/'

async function createSkill(data) {
    try {
        const response = await method(`${BASE_URL}`, {
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