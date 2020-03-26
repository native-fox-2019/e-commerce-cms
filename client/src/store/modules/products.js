import axios from 'axios';

const heroku = 'https://frozen-wildwood-55741.herokuapp.com';
// const local = 'http://localhost:3000';

const state = {
  products: [],
};

const getters = {
  allProducts: (states) => states.products,
};

const actions = {
  async getAllProducts({ commit }) {
    const { data } = await axios.get(`${heroku}/products`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    data.sort((a, b) => a.id - b.id);
    commit('setProducts', data);
  },

  async addProduct({ commit }, product) {
    const { data } = await axios.post(`${heroku}/products`, product, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });

    commit('addProduct', data);
  },

  async editProduct({ commit }, product) {
    await axios.put(`${heroku}/products/${product.id}`, product, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    commit('editProduct', product);
  },

  async deleteProduct({ commit }, id) {
    await axios.delete(`${heroku}/products/${id}`, {
      headers: {
        token: localStorage.getItem('token'),
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
