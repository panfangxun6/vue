import Vue from 'vue'
import Router from 'vue-router'
import admin from './admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../view/login/login')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../view/register/register')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../packages/ui/errorPage/404.vue')
    },
    ...admin,
    {
      path: '*',
      name: 'err',
      redirect: '404',
    },
  ]
})
