import Vue from 'vue'
import App from './App.vue'
import store from './store'
// import deck from 'deck-of-cards'
import './registerServiceWorker'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VAlert,
  // VCard,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VAlert,
    // VCard,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
})

Vue.config.productionTip = false
// Vue.prototype.$deck = deck
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
