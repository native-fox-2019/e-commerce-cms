import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products:[
      {id:1,product:'Nike',price:'10000',stock:10},
      {id:2,product:'Nike 2',price:'10000',stock:10},
      {id:3,product:'Nike 3',price:'10000',stock:10}
    ]
  },
  mutations: {
    addProduct(state,product){
      let newProduct={};
      newProduct.id=state.products.length+1;
      newProduct.product=product.name;
      newProduct.price=product.price;
      newProduct.stock=Number(product.stock);

      state.products.push(newProduct);
    },
    updateProduct(state,payload){
      let currProduct=state.products.find((p)=>p.id==payload.id);
      console.log({currProduct});
      currProduct.product=payload.product.name;
      currProduct.price=payload.product.price;
      currProduct.stock=payload.product.stock;
    },
    deleteProduct(state,payload){
      let deleteIndex=state.products.findIndex((p)=>p.id==payload);
      state.products.splice(deleteIndex,1);
    }
  },
  actions: {},
  modules: {}
});
