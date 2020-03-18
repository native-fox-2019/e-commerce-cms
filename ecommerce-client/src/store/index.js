import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAdmin: false,
    items: [],
    axiosUrl: 'http://localhost:3000',
    showModal: false,
    findResult: [],
  },
  mutations: {
    toggleLoginAdmin(state) {
      state.isLogin = true;
      state.isAdmin = true;
    },
    pushNewState(state, payload) {
      console.log(state.items);
      console.log(payload);
      state.items = payload;
    },
    toggleModal(state) {
      state.showModal = !state.showModal;
      console.log(state.showModal);
    },
    emptyFind(state) {
      state.findResult = [];
    },
    setFind(state, payload) {
      state.findResult = payload;
      console.log(state.findResult);
    },
    comitNewData(state, payload) {
      state.items.push(payload);
    },
    deleteById(state, id) {
      const array = state.items.filter((element) => element.id !== id);
      console.log(array);
    },

  },
  actions: {
    adminLogin(context) {
      context.commit('toggleLoginAdmin');
    },
    getAllItem(context) {
      axios({
        method: 'GET',
        url: `${context.state.axiosUrl}/product`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          console.log(data);
          context.commit('pushNewState', data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pushData(context, payload) {
      context.commit('comitNewData', payload);
    },
    deleteData(context, id) {
      context.commit('deleteById', id);
    },
  },
  modules: {
  },
});
