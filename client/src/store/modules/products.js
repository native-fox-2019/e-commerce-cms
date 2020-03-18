import axios from 'axios';

const server = 'http://localhost:3000';

const state = {
  products: [],
};

const getters = {
  allProducts: (states) => states.products,
};

const actions = {
  async getAllProducts({ commit }) {
    const { data } = await axios.get(`${server}/products`, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    });

    commit('setProducts', data);
  },

  async addProduct({ commit }, product) {
    const { data } = await axios.post(`${server}/products`, product, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    });

    commit('addProduct', data);
  },

  async deleteProduct({ commit }, id) {
    await axios.delete(`${server}/products/${id}`, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    });

    commit('deleteProduct', id);
  },
};

const mutations = {
  setProducts: (states, products) => {
    const newState = states;
    newState.products = products;
  },

  addProduct: (states, product) => {
    states.products.push(product);
  },

  deleteProduct: (states, id) => {
    const newState = states;
    const newProducts = states.products.filter((product) => product.id !== id);
    newState.products = newProducts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
