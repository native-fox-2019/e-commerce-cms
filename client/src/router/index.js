import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import AddProducts from '../views/AddProducts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Landing,
  },
  {
    path: '/register',
    component: Register,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token')) {
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
