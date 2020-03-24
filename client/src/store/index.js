import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        // url : 'https://powerful-meadow-02119.herokuapp.com',
        url : 'http://localhost:3000',
    },
    mutations: {
        setProduct: (state, data) => {
          state.products = data
        }
    },
    actions: {
      getProduct(context) {
        axios({
          method: 'get',
          url: `${this.state.url}/products/`,
          headers: {
              access_token: localStorage.getItem('token')
          }
        })
        .then(response => {
          context.commit('setProduct', response.data.data)
        })
        .catch(err=>{
          console.log(err)
        })
      },
    },
    modules: {}
})