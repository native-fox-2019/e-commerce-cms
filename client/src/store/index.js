import Vue from 'vue';
import Vuex from 'vuex';
import appAxios from '../config/appAxios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // USER
    token: localStorage.getItem('token') || '',
    userProfile: '',
    specialRole: '',
    isLogin: false,
    // ITEMS
    itemsArr: [],
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload;
    },
    changeUserProfile(state, payload) {
      state.userProfile = { payload };
    },
    changeIsLogin(state, payload) {
      state.isLogin = payload;
      // if (!payload) {
      //   this.$router.push('/login');
      // }
    },
    changeSpecialRole(state, payload) {
      state.specialRole = payload;
      // console.log('Role:', state.specialRole);
    },
    changeItemsArr(state, payload) {
      state.itemsArr = payload;
      // console.log('List of items:', state.itemsArr);
    },
  },
  actions: {
    getAllItems(context) {
      appAxios({
        method: 'GET',
        url: '/items',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          // console.log('result', result);
          context.commit('changeItemsArr', result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
