import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: Login,
    meta: { isLogin: true }
  },
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.isLogin)) {
    if (localStorage.access_token) {
      next("/");
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
