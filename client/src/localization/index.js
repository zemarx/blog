import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from './../config/config'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        'en': require('./en.json'),
        'ru': require('./ru.json')
    },
    // dateTimeFormats: config.dateTimeFormats /// TODO: THIS FEATURE WILL BE AVAILABLE in version 7 of vue-i18n
});

if (module.hot) {
    module.hot.accept(['./en.json', './ru.json'], () => {
        i18n.setLocaleMessage('en', require('./en.json'));
        i18n.setLocaleMessage('ru', require('./ru.json'));
    })
}

export default i18n;
