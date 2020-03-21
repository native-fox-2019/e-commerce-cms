import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SERVER:'http://localhost:3000',
    isLogin:false,
    products:[],
    token:'',
    headers:{
      'Content-Type':'application/json',
      token:localStorage.token
    }
  },
  mutations: {
    setProducts(state,products){
      state.products=products;
    },
    addProduct(state,product){
      let newProduct={};
      newProduct.id=state.products.length+1;
      newProduct.name=product.name;
      newProduct.price=product.price;
      newProduct.stock=Number(product.stock);

      state.products.push(newProduct);
    },
    updateProduct(state,payload){
      let currProduct=state.products.find((p)=>p.id==payload.id);
      console.log({currProduct});
      currProduct.name=payload.product.name;
      currProduct.price=payload.product.price;
      currProduct.stock=payload.product.stock;
    },
    deleteProduct(state,payload){
      let deleteIndex=state.products.findIndex((p)=>p.id==payload);
      state.products.splice(deleteIndex,1);
    },
    setToken(state,token){
      state.token=token;
      state.headers.token=token;
    }
  },
  actions: {
    fetchProducts({state,commit}){
      axios.get(state.SERVER+'/product',{
        headers:state.headers
      })
      .then((response)=>{
        var data=response.data
        commit('setProducts',data);
      })
      .catch((err)=>{
        console.log('Ada error saat fetch product');
        return err;
      })
    },
    addProduct({state,commit},product){
      return axios.post(state.SERVER+'/product',product,{
        headers:state.headers
      })
      .then((res)=>{
        var data=res.data.product;
        commit('addProduct',data);
        return data;
      })
      .catch((err)=>{
        console.log('Ada error saat create product');
        return err;
      })
    },
    updateProduct({state,commit},payload){
      var id=payload.id;
      var product=payload.product;
      return axios.put(state.SERVER+'/product/'+id,product,{
        headers:state.headers
      })
      .then(()=>{
        commit('updateProduct',payload);
        return product;
      })
      .catch((err)=>{
        console.log('Ada error saat update product');
        return err;
      })
    },
    deleteProduct({state,commit},id){
      return axios.delete(state.SERVER+'/product/'+id,{
        headers:state.headers
      })
      .then(()=>{
        commit('deleteProduct',id);
        return id;
      })
      .catch((err)=>{
        console.log('Ada error saat delete product');
        return err;
      })
    }
  },
  modules: {}
});
