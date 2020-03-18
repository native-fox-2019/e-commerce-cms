import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Product from '../views/product/Product.vue';
import CreateProduct from '../views/product/create-product';
import EditProduct from '../views/product/edit-product';

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
  },
  {
    path:'/product/edit/:id',
    name:'EditProduct',
    component:EditProduct
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

const listAuthList=['CreateProduct','Product','EditProduct'];

router.beforeEach((to, from, next) => {
  var token=localStorage.getItem('token');
  if(to.name==='Login' && token ) next({name:'Product'})
  else if (listAuthList.indexOf(to.name)!==-1 && !token) next({ name: 'Login' })
  else next()
})

export default router;
