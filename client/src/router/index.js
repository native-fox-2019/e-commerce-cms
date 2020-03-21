import Vue from 'vue';
import VueRouter from 'vue-router';

import LandingPage from '@/views/LandingPage.vue';
import Register from '@/views/Register.vue';
import LogIn from '@/views/LogIn.vue';
import ItemDetail from '@/views/ItemDetail.vue';
import UserProfile from '@/views/UserProfile.vue';
import AddItem from '@/views/AddItem.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'LogIn', component: LogIn },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true,
  },
  {
    path: '/item/:id',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true,
  },
  { path: '/add-item', name: 'AddItem', component: AddItem },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
