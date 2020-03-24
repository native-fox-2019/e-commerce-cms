import Vue from 'vue';
import VueRouter from 'vue-router';
import base64url from 'base64url';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import AddProduct from '../views/AddProduct.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import EditProduct from '../views/EditProduct.vue';
import DeleteProduct from '../views/DeleteProduct.vue';
import Forbidden from '../views/Forbidden.vue';

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
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: Forbidden,
  },
  {
    path: '/edit-product/:id',
    name: 'Edit Product',
    component: EditProduct,
  },
  {
    path: '/delete-product/:id',
    name: 'Delete Product',
    component: DeleteProduct,
  },
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'Register' || to.name === 'Forbidden') {
    next();
  } else if (localStorage.jwt) {
    const [,encodedPayload,] = localStorage.jwt.split('.');
    const { isAdmin } = JSON.parse(base64url.decode(encodedPayload));
    if (isAdmin) {
      next();
    } else {
      next({ name: 'Forbidden' });
    }
  } else {
    next({ name: 'Login' });
  }
});

export default router;
