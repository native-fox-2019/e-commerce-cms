import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import form from '../helpers/form';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SERVER:'https://aqueous-badlands-12134.herokuapp.com',
    // SERVER:'http://localhost:3000',
    isLogin:false,
    products:[],
    token:'',
    headers:{
      'Content-Type': 'multipart/form-data',
      token:localStorage.token,
      'Sec-Fetch-Mode':'cors'
    },
    categories:[
      { item: 'lifestyle', name: 'lifestyle' },
      { item: 'gym', name: 'gym' },
      { item: 'basketball', name: 'basketball' },
      { item: 'soccer', name: 'soccer' },
    ],
    bannerLoaded:false,
    banners:[]
  },
  mutations: {
    setProducts(state,products){
      state.products=products;
    },
    setBannerLoaded(state,isLoaded){
      state.bannerLoaded=isLoaded;
    },
    setBanner(state,banners){
      state.banners=banners;
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
      var formProduct=form.add(product);
      return axios.post(state.SERVER+'/product',formProduct,{
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
      var product=form.add(payload.product);
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
    },
    loadBanner({state,commit}){
      if(state.bannerLoaded)
        return Promise.resolve();

      return axios.get(state.SERVER+'/banners',{
        headers:state.headers
      })
      .then((result)=>{
        var data=result.data;
        commit('setBanner',data);
        commit('setBannerLoaded',true);
      })
      .catch((err)=>{
        console.log('Ada error saat load banner',err);
        return err
      })
    },

    addBanner({state,commit},banner){
      var bannerForm=form.add(banner);
      return axios.post(state.SERVER+'/banners',bannerForm,{
        headers:state.headers
      })
      .then((result)=>{
        commit('setBannerLoaded',false);
        return result;
      })
      .catch(err=>{
        console.log('Ada error saat upload banner',err)
      })
    },

    deleteBanner({state,commit},banner){

      var bannerName=banner.name;
      return axios.delete(state.SERVER+'/banners/'+bannerName,{
        headers:state.headers
      })
      .then(result=>{
        commit('setBannerLoaded',false);
        console.log(result);
        return result;
      })
      .catch(err=>{
        console.log('Ada error saat delete banner',err);
      })
    }
  },
  modules: {}
});
