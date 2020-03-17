import axios from 'axios';

const state = {
  access_token: '',
};

const getters = {
  accessToken: (states) => states.access_token,
};

const actions = {
  async login({ commit }, userData) {
    const response = await axios.post('http://localhost:3000/login', userData);
    commit('setAccessToken', response.data.access_token);
  },
  async register({ commit }, userData) {
    const response = await axios.post('http://localhost:3000/register', userData);
    commit('setAccessToken', response.data.access_token);
  },
};

const mutations = {
  setAccessToken: (states, token) => {
    const newState = states;
    newState.access_token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
