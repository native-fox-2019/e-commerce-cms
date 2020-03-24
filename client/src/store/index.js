import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:[],
    productEdit:{}
  },
  mutations: {
    fillProduct(state,payload){
      state.products = payload
      console.log(state.products)
    },
    commitNewData(state, payload) {
      state.products.push(payload);
    },
    commitEditData(state,payload){
      console.log("ini payload mutation",payload)
      state.productEdit["data"] = payload
      console.log("ini state.productedit",state.productEdit.data)
    },
    deleteDataArray(state,id){
      state.products = state.products.filter(item=>item.id !== id)
    },
    updateEditData(state,payload){
      state.products.forEach(product => {
        if(product.id==state.productEdit.data.id){
          product = payload
        }
      });
    }
  },
  actions: {
    
    getAllProducts(context){
      
      axios({
          method:"GET",
          url:"https://hidden-beyond-35816.herokuapp.com/product",
          headers:{token: localStorage.getItem("token")}
      }).then(response=>{
        context.commit("fillProduct",response.data)
      })
    },
    
    pushData(context, payload) {
      context.commit('commitNewData', payload);
    },

    holdEditData(context, payload) {
      console.log("ini payload action", payload)
      context.commit('commitEditData', payload)
    },
    deleteData(context,id){
      context.commit('deleteDataArray',id)
    },
    updateData(context,payload){
      context.commit('updateEditData', payload)
    }

  },
  modules: {}
});
