import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: null,
  },
  mutations: {
    viewProducts(state, params) {
      state.productList = params;
    },
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          context.commit('viewProducts', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(context, params) {
      axios({
        method: 'PUT',
        url: `http://localhost:3000/product/${params.id}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          name: params.name,
          image_url: params.image_url,
          price: params.price,
          stock: params.stock,
        },
      })
        .then((data) => {
          console.log(data);
          this.$router.push({ name: 'Panel' });
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  modules: {
  },
});
