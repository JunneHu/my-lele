import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/home/home'
import bbs from '@/view/bbs/bbs'
import center from '@/view/center/center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: home
    }, {
      path: '/bbs',
      name: 'bbs',
      component: bbs
    },
    {
      path: '/center',
      name: 'center',
      component: center
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/account/login'),
    }
  ]
})
