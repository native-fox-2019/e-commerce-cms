import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthPage from '../views/AuthPage.vue'
import MainPage from '../views/MainPage.vue'
import RegPage from '../views/RegPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    meta: { requiresAuth: true },
    component: MainPage
  },
  {
    path: '/register',
    name: 'RegPage',
    meta: { requiresAuth: true },
    component: RegPage
  },
  {
    path: '/login',
    name: 'AuthPage',
    meta: { isLogin: true },
    component: AuthPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.access_token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
