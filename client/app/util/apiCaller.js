import fetch from 'isomorphic-fetch';

// create url for accessing the api
export const API_URL = 'http://localhost:8000/api';

export default function callApi(endpoint, method = 'get', body) {
    return fetch(`${API_URL}/${endpoint}`, {
        headers: { 'content-type': 'application/json' },
        method,
        body: JSON.stringify(body)
    })
    .then((response) => {
        // if (response.status >= 400) {
        //     throw new Error("Bad response from server");
        // }
        if(!response.ok) {
            return Promise.reject(response.json);
        }

        return response.json();
    })
    .then(
        response => response,
        error => error
    );
}
