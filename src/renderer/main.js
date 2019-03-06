/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-04T11:54:13-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-04T16:20:10-08:00
 */

import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import elm from 'element-ui'
import Vuei18n from 'vue-i18n'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/reset.css'
import './assets/style-variables.scss'

Vue.use(Vuei18n)
Vue.use(elm, { locale: locale })

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
