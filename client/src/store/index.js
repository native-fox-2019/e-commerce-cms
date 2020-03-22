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
