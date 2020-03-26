import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allProducts: []
  },
  mutations: {
    showProducts(state, data){
      state.allProducts = data
    }
  },
  actions: {
    getData(context){
      axios({
          method : 'get',
          url : `https://still-tundra-68355.herokuapp.com/products`,
          headers : {token: localStorage.getItem('token')}
      })
        .then(res=>{
            context.commit('showProducts', res.data)
        })
        .catch(err=>{
            console.log(err);
        })
    }
  }
})
