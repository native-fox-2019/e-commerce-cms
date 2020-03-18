import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    baseUrl: 'http://localhost:3003',
    isLogin: false,
  },
  mutations: {
    getProducts(state, data) {
      state.products = data;
    },
    addProduct(state, data) {
      state.products.push(data);
    },
    deleteProduct(state, id) {
      state.products = state.products.filter((item) => item.id !== id);
    },
    changeIsLogin(state, status) {
      state.isLogin = status;
    },
  },
  actions: {
    getProducts(context) {
      const options = {
        url: `${context.state.baseUrl}/products`,
        method: 'get',
      };
      axios(options)
        .then((response) => {
          context.commit('getProducts', response.data.products);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
  },
  modules: {
  },
});
