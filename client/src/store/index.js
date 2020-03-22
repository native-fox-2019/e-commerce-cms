import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      products: [],
    };
  },
  mutations: {
    getProducts() {
      axios.get('https://guarded-thicket-66622.herokuapp.com/product')
        .then((data) => {
          data.data.forEach((product) => {
            this.state.products.push(product);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(state, id) {
      const url = `https://guarded-thicket-66622.herokuapp.com/product/${id}`;
      axios.delete(url)
        .then(() => {
          this.dispatch('getProducts');
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  actions: {
    getProducts() {
      this.state.products = [];
      this.commit('getProducts');
    },
  },
  modules: {
  },
});
