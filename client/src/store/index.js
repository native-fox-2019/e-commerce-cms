import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : [],
    isLogin : false,
    isAdmin: false
  },
  mutations: {
    fillProducts(state , payload){
      state.products = payload
    },
    toggleLoginAdmin (state){
      state.isLogin = true;
      state.isAdmin = true
    },
    commitNewdata (state, payload) {
      state.products.push(payload)
    }
  },
  actions: {
    getAllProducts(context){
      axios({
        method:"GET",
        url: "http://localhost:3000/products",
        headers: {token : localStorage.getItem("token")}

      })
      .then(response =>{
        context.commit("fillProducts",response.data)
      })
      .catch(err =>{
        console.log(err)
      })
    },
    adminLogin(context) {
      context.commit("toggleLoginAdmin")
    },
    addNewData(context, payload) {
      context.commit("commitNewData", payload)
    } 
  },
  modules: {}
});
