import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const server = `http://localhost:3000`
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    dataProducts: []
  },
  mutations: {
    toIsLoginTrue(state) {
      state.isLogin = true
    },
    allItem(state, payload) {
      state.dataProducts = payload
    }
  },
  actions: {
    getAll(context) {
      console.log('masuk mulai')
      axios({
        method: 'GET',
        url: `${server}/products`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          console.log(data, '<<<<<<< data fetct product')
          context.commit('allItem', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
