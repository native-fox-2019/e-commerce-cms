import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Adminpage.vue';
import Additem from '../views/Additem.vue';
import Detailpage from '../views/Detailpage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/adminpage',
    name: 'Adminpage',
    meta: { requireAuth: true },
    component: Admin,
  },
  {
    path: '/additem',
    name: 'Additem',
    meta: { requireAuth: true },
    component: Additem,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detailpage,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!localStorage.getItem('token') && localStorage.getItem('level') !== 'admin') next({ name: 'Login' });
    else next();
  } else {
    next();
  }
});

export default router;
