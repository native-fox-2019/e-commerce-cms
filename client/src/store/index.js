import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:[]
  },
  mutations: {
    fillProduct(state,payload){
      state.products = payload
      console.log(state.products)
    }
  },
  actions: {
    getAllProducts(context){
      axios({
          method:"GET",
          url:"http://localhost:3000/product",
          headers:{token:localStorage.getItem("token")}
      }).then(response=>{
        context.commit("fillProduct",response.data)
      })
    }
  },
  modules: {}
});
