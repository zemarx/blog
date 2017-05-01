<template>
    <div class="wrapper">
        <nav>
            <ul class="nav-wrapper">
                <li>
                    <router-link to="/">{{ $t('nav.home') }}</router-link>
                </li>
                <li>
                    <router-link to="/about">{{ $t('nav.about') }}</router-link>
                </li>
                <li>
                    <router-link to="/createpost">{{ $t('nav.createPost') }}</router-link>
                </li>
                <li>
                    <div>
                        <select v-model="locale">
                            <option disabled value="">Language</option>
                            <option>en</option>
                            <option>ru</option>
                        </select>
                    </div>
                </li>
                <li>
                    <router-link v-if="loggedIn" to="/logout">{{ $t('nav.signOut') }}</router-link>
                    <router-link v-if="!loggedIn" to="/login">{{ $t('nav.signIn') }}</router-link>
                </li>
            </ul>
        </nav>

        <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
        </transition>
    </div>
</template>
// ------------------------------SCRIPT-----------------------------------------
<script>
import auth from './services/auth.service';

export default {
    data () {
        return {
            locale: 'en',
            loggedIn: auth.loggedIn()
        }
    },
    watch: {
        // TODO: Set locale to local storage, so if page updates it can be restored
        locale (val) {
            this.$i18n.locale = val;
        }
    },
    created () {
        // Set onChange() function in auth service, so that when calling onChange() in auth service this function get invoked
        auth.onAuthChange = loggedIn => {
            this.loggedIn = loggedIn;
        }
    }
}
</script>
// -------------------------------STYLE------------------------------------------
<style>
html, body {
    /*height: 100%;*/
    margin: 0;
    padding: 0;
}

body {
    font-size: 20px;
}

.wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
}

nav > ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: #dedede;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 70px;
}

nav > ul li {
    margin-left: 30px;
    list-style: none;
}

nav > ul li:nth-child(4) {
    margin-left: auto;
}

nav > ul li:last-child {
    margin-right: 40px;
}

nav > ul li a {
    text-decoration: none;
}

.fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .20s;
}

.fade-enter-active {
    transition-delay: .20s;
}

.fade-enter, .fade-leave-active {
    opacity: 0
}

</style>
