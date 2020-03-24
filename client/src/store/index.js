import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt: localStorage.jwt,
    products: null
  },
  mutations: {
    setJwt(state, jwt) {
      state.jwt = jwt;
      localStorage.jwt = jwt;
    },
    deleteJwt(state) {
      state.jwt = null;
      delete localStorage.jwt;
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, product) {
      const id = product.id;
      const index = state.products.findIndex(p => p.id === id);
      if (index !== -1) {
        state.products[index] = product;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
