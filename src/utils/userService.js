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

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),  // If you are sending a file/photo over
    // what do datatype do you need to change this too?
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  // Parameter destructuring!
  .then(({token}) => tokenService.setToken(token));
  // The above could have been written as
  //.then((token) => token.token);
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

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile,
  reorderSkills,
};