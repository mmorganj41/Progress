import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}
  }).then(res => {
    if(res.ok) return res.json() // decoding the json from the server response
    // so that we can interact with it like a regular javascript object
    throw new Error('Error from getProfile request, check the server terminal')
  })
}

async function signup(user) {
    const response = await fetch(BASE_URL + 'signup', {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
      // what do datatype do you need to change this too?
      body: JSON.stringify(user)
    })
    if (response.ok) {
      const {token} = await response.json();
      return tokenService.setToken(token);
    }

    const {err} = await response.json();
    console.log(err);
    throw new Error(err);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

async function changePassword(data) {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization', `Bearer ${tokenService.getToken()}`);
  try {
    const response = await fetch(BASE_URL + 'changePassword', {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const responseData = await response.json();
      tokenService.setToken(responseData.token);
    }

  } catch(err) {
    console.log(err);
  }
}

async function reorderSkills(data) {
  const header = new Headers();
  header.append('Content-Type', 'application/json');
  header.append('Authorization', `Bearer ${tokenService.getToken()}`);

  try {
    const response = await fetch(BASE_URL + 'reorder', {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(data)
    })

    if (response.ok) return await response.json();

  } catch(err) {
    console.log(err);
  }
}

async function editProfile(data) {
  const header = new Headers();
  header.append('Authorization', `Bearer ${tokenService.getToken()}`);

  try {
    const response = await fetch(BASE_URL, {
      method: 'PUT',
      headers: header,
      body: data,
    })

    if (response.ok) {
      const responseData = await response.json();
      tokenService.setToken(responseData.token);
      return responseData.user;
    }

  } catch(err) {
    console.log(err);
  }
}

async function search(query) {
    const header = new Headers();
    header.append('Authorization', `Bearer ${tokenService.getToken()}`);

    try {
      const response = await fetch(`${BASE_URL}search?${query}`, {
        method: 'GET',
        headers: header,
      });

      if (response.ok) return await response.json();
    } catch(err) {
      console.log(err);
    }
}

export default {
  signup, 
  getUser,
  logout,
  login,
  search,
  getProfile,
  reorderSkills,
  editProfile,
  changePassword,
};