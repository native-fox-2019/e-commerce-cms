import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AdminPage from "../views/AdminPage.vue"
import tableProduct from "../components/tableProduct.vue";
import addAdmin from "../components/addAdmin.vue"
import addProduct from "../components/addProduct.vue";
import editProduct from "../components/editProduct.vue";
import adminList from "../components/tableAdmins.vue";
import Register from "../views/Register.vue";
import bannerList from "../components/bannerList.vue";
import addBanner from "../components/addBanner.vue";

Vue.use(VueRouter);

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("token")) {
    next({
      name: "Home"
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter
  },

  {
    path: "/admins",
    name: "AdminPage",
    component: AdminPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      { path: '/', component: tableProduct, requiresAuth: true },
      { path: '/admins/addProduct', component: addProduct, requiresAuth: true, },
      { path: '/admins/addAdmin', component: addAdmin, requiresAuth: true, },
      { path: '/admins/editProduct/:id', component: editProduct, requiresAuth: true, },
      { path: '/admins/adminList', component: adminList, requiresAuth: true, },
      { path: "/admins/bannerList", component: bannerList, requiresAuth: true },
      { path: "/admins/addBanner", component: addBanner, requiresAuth: true },
    ],
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        name: "Home"
      });
    }
  } else {
    next();
  }
})


export default router;
