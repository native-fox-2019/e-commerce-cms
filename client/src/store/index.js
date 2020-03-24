import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: 'http://localhost:3000/',
    navbar: '',
    role: localStorage.role,
    addForm: false,
    list: [],
  },
  mutations: {
  },
  actions: {
    toast(state, { vm, message }) {
      vm.$bvToast.toast(message, {
        title: 'Error',
        toaster: 'b-toaster-bottom-right',
        solid: true,
        appendToast: true,
      });
    },
  },
  modules: {
  },
});
