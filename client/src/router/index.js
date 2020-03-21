import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import main from '../views/main.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    beforeEnter(to, from, next) {
      if (!localStorage.token) {
        store.state.navbar = 'login';
        next({ name: 'login' });
      } else {
        store.state.navbar = 'main';
        next();
      }
    },
  },
  {
    path: '/admins/login',
    name: 'login',
    component: login,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        store.state.navbar = 'main';
        next({ name: 'main' });
      } else {
        store.state.navbar = 'login';
        next();
      }
    },
  },
  {
    path: '/admins/login',
    name: 'logout',
    component: login,
    beforeEnter(to, from, next) {
      localStorage.removeItem('role');
      localStorage.removeItem('token');
      store.state.role = null;
      store.state.navbar = 'login';
      next();
    },
  },
  {
    path: '/admins/register',
    name: 'register',
    component: register,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        store.state.navbar = 'main';
        next({ name: 'main' });
      } else {
        store.state.navbar = 'register';
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
