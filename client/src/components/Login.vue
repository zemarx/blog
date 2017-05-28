<template>
    <div class="login-wrapper">

        <div class="login-inner-wrapper">
            <p v-if="$route.query.redirect">
                You need to login first.
            </p>
            <form @submit.prevent="login">
                <div class="email">
                    <label>Email</label>
                    <input v-model="email" placeholder="email">
                </div>

                <div class="password">
                    <label>Password</label>
                    <input v-model="password" placeholder="password" type="password">
                </div>

                <button class="sign-in-button" type="submit">Sign In</button>

                <p v-if="error" class="login-error">Wrong email or password</p>
            </form>
        </div>
    </div>
</template>
// ------------------------------SCRIPT-----------------------------------------
<script>
    import auth from './../services/auth.service.js';

    export default {
        data () {
            return {
                email: 'root',
                password: 'toor',
                error: false
            }
        },
        methods: {
            login () {
                auth.login(this.email, this.password, loggedIn => {
                    if (!loggedIn) {
                        this.error = true
                    } else {
                        this.$router.replace(this.$route.query.redirect || '/')
                    }
                })
            }
        }
    }
</script>
// -------------------------------STYLE------------------------------------------
<style scoped>
    .login-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 22px;
    }

    .login-inner-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .login-inner-wrapper form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .email {
        display: flex;
        flex-direction: column;
        margin: 15px 0 4px 0;
    }

    .password {
        display: flex;
        flex-direction: column;
        margin: 4px 0 6px 0;
    }

    .sign-in-button {
        margin-top: 6px;
        /*font-size: 13px;*/
    }

    .login-error {
        color: #b31b12;
    }
</style>
