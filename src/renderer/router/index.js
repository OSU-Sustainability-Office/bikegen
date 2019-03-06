/**
 * @Author: Brogan Miner <Brogan>
 * @Date:   2019-03-04T12:29:02-08:00
 * @Email:  brogan.miner@oregonstate.edu
 * @Last modified by:   Brogan
 * @Last modified time: 2019-03-04T12:49:54-08:00
 */

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: require('@/components/landing').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
