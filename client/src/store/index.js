import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        products: [],
        url : 'http://localhost:3000',
        // item : []
    },
    mutations: {
        setProduct: (state, data) => {
          state.products = data
        },
        // setItem: (state, data) => {
        //   state.item = data
        // }
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
      // getItem(context){

      // }
    },
    modules: {}
})