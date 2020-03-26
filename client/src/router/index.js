import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import User from "../components/User.vue";
import Category from "../components/Category.vue";
import Product from "../components/Product.vue";

Vue.use(VueRouter);

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("token")) {
    next({
      path: "/dashboard"
    });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "users",
        name: "User",
        component: User
      },
      {
        path: "categories",
        name: "Category",
        component: Category
      },
      {
        path: "products",
        name: "Product",
        component: Product
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        name: "Login"
      });
    }
  } else {
    next();
  }
});

export default router;
