import axios from 'axios';

const server = 'http://localhost:3000';

const states = {
  products: [],
};

const getters = {
  allProducts: (state) => state.products,
};

const actions = {
  async getAllTodos({ commit }) {
    const { data } = await axios.get(`${server}/products`, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    });

    commit('setProducts', data);
  },
};

const mutations = {
  setProducts: (state, products) => {
    state.products = products;
  },
};

export default {
  states,
  getters,
  actions,
  mutations,
};
