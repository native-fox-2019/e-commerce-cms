import Vue from 'vue';
import VueRouter from 'vue-router';

import LandingPage from '@/views/LandingPage.vue';
import Register from '@/views/Register.vue';
import LogIn from '@/views/LogIn.vue';
import ItemDetail from '@/views/ItemDetail.vue';
import UserProfile from '@/views/UserProfile.vue';
import TransactionHistory from '@/views/TransactionHistory.vue';
import AddItem from '@/views/AddItem.vue';
import UserCarts from '@/views/UserCarts.vue';
import AllCarts from '@/views/AllCarts.vue';

import store from '../store';

Vue.use(VueRouter);

// const beforeEnter = async (to, from, next) => {
//   if (!localStorage.getItem('token')) {
//     next('/login');
//   } else {
//     next();
//   }
// };

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true,
  },
  {
    path: '/add-item',
    name: 'AddItem',
    component: AddItem,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token') || store.state.specialRole !== 'admin') {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/admin/carts',
    name: 'AllCarts',
    component: AllCarts,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && store.state.specialRole === 'admin') {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/user',
    name: 'UserProfile',
    component: UserProfile,
  },
  {
    path: '/user/carts',
    name: 'UserCarts',
    component: UserCarts,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && store.state.specialRole === 'customer') {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/user/carts/history',
    name: 'TransactionHistory',
    component: TransactionHistory,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token') && store.state.specialRole === 'customer') {
        next();
      } else {
        next('/');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
