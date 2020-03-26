import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products : [],
    productEdit : {}
  },
  mutations: {
    fillProducts(state , payload){
      state.products = payload
    },

    commitNewdata (state, payload) {
      state.products.push(payload)
    },
    commitDeleteData (state, payload) {
      state.products = state.products.filter(item => item.id !== payload)
    },
    commitEditData (state, payload) {
      state.productEdit['data'] = payload
    },
    commitUpdateData (state, payload) {
      state.products.forEach(element => {
        if(element.id == state.productEdit.data.id){
          element = payload
        }
      })
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
    addNewData(context, payload) {
      context.commit("commitNewData", payload)
    },
    deleteData(context, payload) {
      context.commit('commitDeleteData', payload)
    },
    holdEditData(context, payload) {
      context.commit('commitEditData', payload)
    },
    updateData(context, payload) {
      context.commit('commitUpdateData', payload)
    }
  },
  modules: {}
});
