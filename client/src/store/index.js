import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const url = 'https://secure-eyrie-18193.herokuapp.com'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [{
      name: 'risol',
      price: 2000,
      stocks: 5,
      imageURL: 'https://craftlog.com/m/i/5214819=s1280=h960'
    },
    {
      name: 'lemper',
      price: 2000,
      stocks: 5,
      imageURL: 'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/sasefoto/original/22659-arem-arem-ayam.jpg'
    },
    {
      name: 'tahu isi',
      price: 2000,
      stocks: 5,
      imageURL: 'https://i.ytimg.com/vi/juJCrwm-NJ8/maxresdefault.jpg'
    },
    {
      name: 'pisang goreng',
      price: 2000,
      stocks: 5,
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuclaC_2mSE3vU9Gvkyc30ir9ZzMxxCKC339FhHKLAVujldz6N'
    }]
  },
  mutations: {
    LIST_PRODUCT (state, payload) {
      state.products = [...payload]
    }
  },
  actions: {
    getAll ({ commit }) {
      axios({
        url: `${url}/products`,
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
