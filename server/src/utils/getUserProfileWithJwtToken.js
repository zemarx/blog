const request = require('request');

module.exports = function(idToken, callback) {
    request({
        url: 'https://zemarx.eu.auth0.com/tokeninfo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        json: {
            id_token: idToken
        }
    }, callback);
};