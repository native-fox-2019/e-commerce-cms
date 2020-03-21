import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import AddProduct from '../views/AddProduct.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/products',
    name: 'Product List',
    component: ProductList,
  },
  {
    path: '/add-product',
    name: 'Add Product',
    component: AddProduct,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && !localStorage.jwt) next({ name: 'Login' });
  else next();
});

export default router;
