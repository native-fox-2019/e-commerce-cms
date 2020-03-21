import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const base = axios.create({
  baseURL: 'http://localhost:3000'
});

Vue.prototype.$axios = base;


export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:3000',
    isLogin: localStorage.getItem("token"),
    allData: null,
    oneProduct: null,
    allAdmins: null,
  },

  mutations: {
    allData(state, data) {
      state.allData = data
    },
    oneProduct(state, data) {
      state.oneProduct = data
    },
    allAdmins(state, data) {
      state.allAdmins = data
    },
    deleteToken(state) {
      state.isLogin = null
    },
    setToken(state) {
      state.isLogin = localStorage.getItem('token')
    }
  },
  actions: {
    getAllData(state) {
      axios({
        method: 'GET',
        url: this.state.baseURL + '/products',
      })
        .then(data => {
          console.log(data);
          state.commit('allData', data.data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    getAdmins(state) {
      axios({
        method: "GET",
        url: this.state.baseURL + '/admins',
        headers: ({ token: localStorage.getItem('token') })
      })
        .then(({ data }) => {
          console.log(data);
          state.commit('allAdmins', data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    getOneData(state, id) {
      axios({
        method: 'GET',
        url: this.state.baseURL + `/products/${id}`
      })
        .then(({ data }) => {
          console.log(data, 'cekincekin');
          state.commit('oneProduct', data)
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
  },
  modules: {}
});
