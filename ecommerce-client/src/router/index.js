import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Adminpage.vue';
import Additem from '../views/Additem.vue';
import Detailpage from '../views/Detailpage.vue';
import adminRegister from '../views/adminregister.vue';
import register from '../views/register.vue';

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
    meta: { requireAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/adminregister',
    name: 'adminregister',
    component: adminRegister,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (!localStorage.getItem('token')) next({ name: 'Login' });
    else next();
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (localStorage.getItem('level') !== 'admin') next({ name: 'Home' });
    else next();
  } else {
    next();
  }
});

export default router;
