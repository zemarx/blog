import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    'en': require('./en.json'),
    'ru': require('./ru.json')
  }
});

if (module.hot) {
  module.hot.accept(['./en.json', './ru.json'], () => {
    i18n.setLocaleMessage('en', require('./en.json'));
    i18n.setLocaleMessage('ru', require('./ru.json'));
  })
}

export default i18n;
