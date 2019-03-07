/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-06T18:42:15-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-06T20:53:57-08:00
 */

import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
