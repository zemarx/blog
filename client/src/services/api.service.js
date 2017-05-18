import 'whatwg-fetch'

const BASE_URL = `http://${window.location.host}/api/`;

export const callApi = (endpoint, method = 'GET', body) => {
    let headers = { 'content-type': 'application/json' };

    if (localStorage.getItem('id_token')) {
        headers['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');
    }

    return fetch(BASE_URL + endpoint, {
        headers: headers,
        method,
        body
    })
    .then(res => res.json())
    .then(json => json)
    .catch(err => err)
};
