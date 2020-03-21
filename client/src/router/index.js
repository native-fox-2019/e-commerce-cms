import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import Register from '../views/Register.vue';
import Home from '../views/Home.vue';
import AddProducts from '../views/AddProducts.vue';
import EditProduct from '../views/EditProduct.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Landing,
    meta: { isLogin: true },
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
  {
    path: '/products/edit/:id',
    name: 'Edit',
    component: EditProduct,
    props: true,
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
    if (store.state.login.isSuperAdmin) {
      next();
    } else {
      next({
        path: '/',
      });
    }
  } else if (to.matched.some((record) => record.meta.isLogin)) {
    if (localStorage.getItem('access_token')) {
      next({
        path: '/products',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
