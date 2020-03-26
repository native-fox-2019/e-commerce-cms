import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //products: []
  },
  
  actions: {
    // getProducts(commit){
    //   axios.get('http://localhost:3000/products/show')
    //   .then(result=>{
    //     console.log(result.data)
    //     let post = result.data
    //     commit('updateProducts', post)
    //   })
    //   .catch(err=>{
    //     this.error=err.response
    //   })
    // }
  },
  mutations: {
    // updateProducts(state, post){
    //   state.products = post
    //   console.log(post +"<<di mutasi")
    // }
  },
  modules: {
  }
})
