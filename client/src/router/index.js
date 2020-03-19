import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import AddAdmin from '../views/AddAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    meta : {requiresAuth:true},
    component: HomePage
  },
  {
    path: '/login',
    name: 'LoginPage',
    meta : {isLogin:true},
    component: LoginPage
  },
  {
    path: '/addadmin',
    name: 'AddAdmin',
    meta : {requiresAuth:true},
    component: AddAdmin
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } 
  else {
    next()
  }
})

export default router
