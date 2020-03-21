import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AdminPage from "../views/AdminPage.vue";
import LoginPage from "../views/LoginPage.vue";
import AddPage from "../views/AddPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/adminPage",
    name: "AdminPage",
    component: AdminPage,
    meta:{requiresAuth:true}
  },
  {
    path: "/loginPage",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/addPage",
    name: "AddPage",
    component: AddPage,
    meta:{requiresAuth:true}
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
if(to.matched.some(record => record.meta.requiresAuth))
{
  let token = localStorage.getItem("token")
  if (!token){
    next({ name: "LoginPage" })
  }
  else next()
}
else{
  next()
}
})

export default router;
