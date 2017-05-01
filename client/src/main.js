import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import App from './App.vue';
import i18n from './localization';
import router from './router';
// import store from './store';

Vue.use(VueQuillEditor);

new Vue({
    el: '#app',
    i18n,
    // store,
    router,
    render: h => h(App)
});
