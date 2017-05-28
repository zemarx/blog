
import { callApi } from './api.service'

export default {

    handleAuthError() {

    },


    parseJwt(token) {
        let parts = token.split('.');

        if (parts.length !== 3) {
            //err
        }

        let header = window.atob(parts[0]);
        let claim = window.atob(parts[1]);

        return { header, claim }
    },


    login(email, password, callback) {
        callApi('login', 'POST', {
            email: email,
            password: password
        })
        .then(res => {
            if (res.status === 200) {
                let token = res.token;
                let { claim } = this.parseJwt(token);

                localStorage.setItem("id_token", token);
                localStorage.setItem("profile", claim);

                if (callback) {
                    callback(true);
                }
                this.onAuthChange(true);
            } else if (res.status === 401) {
                throw Error('Authentication failed');
            }
        })
        .catch(err => {
            // Login failed

            if (callback) {
                callback(false);
            }

            this.onAuthChange(false);
        });
    },


    getToken() {
        return localStorage.getItem("id_token");
    },


    logout(callback) {
        localStorage.removeItem("id_token");

        if (callback) {
            callback()
        }

        this.onAuthChange(false);
    },


    loggedIn() {
        return !!localStorage.getItem("id_token");
    },


    onAuthChange() {
        // this function is implemented elsewhere so it will be called there, where it is implemented
    }
}
