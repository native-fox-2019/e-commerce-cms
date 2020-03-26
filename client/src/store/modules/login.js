import axios from 'axios';
import jwt from 'jsonwebtoken';

const heroku = 'https://frozen-wildwood-55741.herokuapp.com';
// const local = 'http://localhost:3000';

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
    try {
      const response = await axios.post(`${heroku}/login`, userData);
      commit('setAccessToken', response.data.token);
    } catch (err) {
      throw err.response.data;
    }
  },

  async register({ commit }, userData) {
    try {
      const response = await axios.post(`${heroku}/register`, userData);
      commit('setAccessToken', response.data.token);
    } catch (err) {
      throw err.response.data;
    }
  },

  async checkSuperAdmin({ commit }) {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      const userData = jwt.verify(accessToken, 'rahasia');
      if (userData.role === 'superAdmin') {
        commit('setRole', true);
      } else {
        commit('setRole', false);
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
