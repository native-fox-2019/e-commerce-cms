import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import AddProducts from '../views/AddProducts.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresSuperAdmin: true },
  },
  {
    path: '/products',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/products/add',
    component: AddProducts,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token')) {
      next();
    } else {
      next({
        path: '/',
      });
    }
  } else if (to.matched.some((record) => record.meta.requiresSuperAdmin)) {
    await store.dispatch('checkSuperAdmin');
    if (store.state.login.isSuperAdmin) {
      next();
    } else {
      next({
        path: '/',
      });
    }
  } else {
    next();
  }
});

export default router;
