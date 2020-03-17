import axios from 'axios';

const state = {
  access_token: '',
};

const getters = {};

const actions = {
  async login({ commit }, userData) {
    const { data } = axios.post('http://localhost:3000/login', userData);
    commit('setAccessToken', data);
  },
};

const mutations = {
  setAccessToken: (data) => {
    console.log(data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
