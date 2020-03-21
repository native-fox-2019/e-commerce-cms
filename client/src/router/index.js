import Vue from "vue";
import VueRouter from "vue-router";
import AdminPage from "../views/AdminPage.vue";
import LoginPage from "../views/LoginPage.vue";
import AddPage from "../views/AddPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import EditPage from "../views/EditPage.vue";

Vue.use(VueRouter);

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem("token")) {
    next({
      path: '/adminPage'
    })
  } else {
    next()
  }
}

const routes = [

  {
    path: "/adminPage",
    name: "AdminPage",
    component: AdminPage,
    meta:{requiresAuth:true}
  },
  {
    path: "/loginPage",
    name: "LoginPage",
    component: LoginPage,
    beforeEnter
  },
  {
    path: "/addPage",
    name: "AddPage",
    component: AddPage,
    meta:{requiresAuth:true}
  },
  {
    path: "/registerPage",
    name: "RegisterPage",
    component: RegisterPage,
    beforeEnter
  },
  {
    path: "/editPage",
    name: "EditPage",
    component: EditPage
  },
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
