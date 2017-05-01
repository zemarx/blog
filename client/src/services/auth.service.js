
export default {
    login(email, pass, cb) {
        cb = arguments[arguments.length - 1];

        if (localStorage.token) {
            if (cb) {
                cb(true);
            }

            this.onAuthChange(true);

            return;
        }

        pretendRequest(email, pass, (res) => {
            if (res.authenticated) {
                localStorage.token = res.token;

                if (cb) {
                    cb(true);
                }

                this.onAuthChange(true)
            } else {
                if (cb) {
                    cb(false);
                }

                this.onAuthChange(false)
            }
        })
    },

    getToken() {
        return localStorage.token
    },

    logout(cb) {
        delete localStorage.token;

        if (cb) {
            cb()
        }

        this.onAuthChange(false);
    },

    loggedIn() {
        return !!localStorage.token
    },

    onAuthChange() {

    }
}


function pretendRequest(email, pass, cb) {
    setTimeout(() => {
        if (email === 'root' && pass === 'toor') {
            cb({
                authenticated: true,
                token: Math.random().toString(36).substring(7)
            })
        } else {
            cb({ authenticated: false })
        }
    }, 0)
}

