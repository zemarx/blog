
<template>
  <div>
    <h2>Login</h2>
    <p v-if="$route.query.redirect">
      You need to login first.
    </p>
    <form @submit.prevent="login">
      <label><input v-model="email" placeholder="email"></label>
      <label><input v-model="password" placeholder="password" type="password"></label><br>
      <button type="submit">Sign In</button>
      <p v-if="error" class="error">Wrong email or password</p>
    </form>
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
</style>
