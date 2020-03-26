import Vuex from 'vuex';
import Vue from 'vue';
import products from './modules/products';
import login from './modules/login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    login,
  },
});
