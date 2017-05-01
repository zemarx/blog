import 'whatwg-fetch'

const BASE_URL = 'http://localhost:3000/api/';

export const callApi = (endpoint, method = 'GET', body) => {
    return fetch(BASE_URL + endpoint, {
        headers: { 'content-type': 'application/json' },
        method,
        body
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => err)
};
