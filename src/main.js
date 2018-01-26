import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'
import ViewPlus from 'vue-viewplus'
import { viewPlusOptions } from './config'

Vue.config.productionTip = false

Vue.use(Navigation, { router, store })

Vue.use(ViewPlus, {store, ...viewPlusOptions})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
