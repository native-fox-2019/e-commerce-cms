import axios from 'axios';
import jwt from 'jsonwebtoken';

const server = 'https://limitless-atoll-12110.herokuapp.com';

const state = {
  access_token: '',
  isSuperAdmin: false,
};

const getters = {
  accessToken: (states) => states.access_token,
  isSuperAdmin: (states) => states.isSuperAdmin,
};

const actions = {
  async login({ commit }, userData) {
    const response = await axios.post(`${server}/login`, userData);
    commit('setAccessToken', response.data.access_token);
  },

  async register({ commit }, userData) {
    const response = await axios.post(`${server}/register`, userData);
    commit('setAccessToken', response.data.access_token);
  },

  async checkSuperAdmin({ commit }) {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const userData = jwt.verify(accessToken, 'rahasia');
      if (userData.role === 'superAdmin') {
        commit('setRole', true);
      }
    } else {
      commit('setRole', false);
    }
  },
};

const mutations = {
  setAccessToken: (states, token) => {
    const newState = states;
    newState.access_token = token;
  },

  setRole: (states, boolean) => {
    const newState = states;
    newState.isSuperAdmin = boolean;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
