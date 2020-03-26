import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const BaseUrl = axios.create({
  baseURL: "http://localhost:3000"
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: null,
    userName: null,
    users: null,
    categories: null,
    products: null
  },
  mutations: {
    login(state) {
      state.isLogin = true;
      state.userName = localStorage.getItem("name");
    },
    logout(state) {
      state.isLogin = false;
    },
    users(state, payload) {
      state.users = payload;
    },
    categories(state, payload) {
      state.categories = payload;
    },
    products(state, payload) {
      state.products = payload;
    }
  },
  actions: {
    getUsers(context) {
      BaseUrl.get("/user", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("users", data);
          // console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getCategories(context) {
      BaseUrl.get("/categories", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("categories", data);
          // console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    getProducts(context) {
      BaseUrl.get("/products", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          context.commit("products", data);
          // console.log(data);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  modules: {}
});
