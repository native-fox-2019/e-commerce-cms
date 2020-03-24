import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    baseUrl: 'https://whispering-cliffs-47024.herokuapp.com',
    isLogin: false,
    isAdmin: false,
    productId: 0,
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
    changeProductId(state, id) {
      state.productId = id;
    },
    changeIsAdmin(state, data) {
      state.isAdmin = data;
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
          response.data.products.sort((a, b) => a.id - b.id);
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
