import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Product from '../views/product/Product.vue';
import CreateProduct from '../views/product/create-product';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:'/product/create',
    name:'CreateProduct',
    component:CreateProduct
  },
  {
    path:'/product',
    name:'Product',
    component:Product
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
