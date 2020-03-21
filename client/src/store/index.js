import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      products: [],
    };
  },
  mutations: {
    laught() {
      console.log('wkwkwkwk');
    },
  },
  actions: {
  },
  modules: {
  },
});
