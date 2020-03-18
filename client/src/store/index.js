import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: null,
    user: {
      name: '',
      email: '',
      password: ''
    },
    product: {
      name: '',
      price: 0,
      stocks: 0,
      imageURL: ''
    }
  },
  mutations: {
    LIST_PRODUCT (state, payload) {
      state.products = [...payload]
    }
  },
  actions: {
    getAll ({ commit }) {
      axios({
        url: `${url}/user`,
        method: 'get',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(result => {
          console.log(result)
          commit('LIST_PRODUCT', result.data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
