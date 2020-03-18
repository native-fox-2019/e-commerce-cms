import axios from 'axios';

const server = 'https://limitless-atoll-12110.herokuapp.com';

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
    data.sort((a, b) => a.id - b.id);
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

  async editProduct({ commit }, product) {
    await axios.put(`${server}/products/${product.id}`, product, {
      headers: {
        access_token: localStorage.getItem('access_token'),
      },
    });

    commit('editProduct', product);
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

  editProduct: (states, data) => {
    const newState = states;
    const filtered = states.products.filter((product) => product.id !== data.id);
    filtered.push(data);
    newState.products = filtered.sort((a, b) => a.id - b.id);
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
