import Vue from 'vue'
import App from './App.vue'
import store from './store'
import deck from 'deck-of-cards'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.prototype.$deck = deck
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
