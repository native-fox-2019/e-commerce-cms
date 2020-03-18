import Vue from 'vue';
import VueRouter from 'vue-router';
import main from '../views/main.vue';
import login from '../views/login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: main,
    beforeEnter(to, from, next) {
      if (!localStorage.token) {
        next({ name: 'login' });
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({ name: 'main' });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
