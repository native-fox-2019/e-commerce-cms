import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'https://secure-eyrie-18193.herokuapp.com'

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
          result.data.forEach(el => {
            el.price = new Intl.NumberFormat(['ban', 'id']).format(el.price)
          })
          commit('LIST_PRODUCT', result.data)
        })
    }
  },
  modules: {
  }
})
