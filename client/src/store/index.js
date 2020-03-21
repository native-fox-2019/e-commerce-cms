import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const server = `http://localhost:3000`
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isAddProduct: false,
    isEditProduct: false,
    dataProducts: [],
    dataEditProducts: {}
  },
  getters: {
    filterBaju(state) {
      return state.dataProducts.filter(baju => baju.Category.name == 'baju')
    }
  },
  mutations: {
    toIsLoginTrue(state) {
      state.isLogin = true
    },
    toIsLoginFalse(state) {
      state.isLogin = false
    },
    allItem(state, payload) {
      state.dataProducts = payload
    },
    setIsAddProductTrue(state) {
      state.isAddProduct = true
    },
    setIsAddProductFalse(state) {
      state.isAddProduct = false
    },
    setIsEditProductTrue(state) {
      state.isEditProduct = true
    },
    setIsEditProductFalse(state) {
      state.isEditProduct = false
    },
    dataEditfromActions(state, payload) {
      // console.log(payload, '<<<<<<< data get one dari store mutation')
      state.dataEditProducts = payload
    }
  },
  actions: {
    getAll(context) {
      axios({
        method: 'GET',
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          // console.log(data, '<<<<<<< data fetct product')
          context.commit('allItem', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct(context, objDataAdd) {
      axios({
        method: 'POST',
        url: `${server}/products`,
        headers: {
          token: localStorage.token
        },
        data: objDataAdd,
      })
        .then(({ data }) => {
          context.dispatch('getAll')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct(context, id) {
      axios({
        method: 'DELETE',
        url: `${server}/products/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.dispatch('getAll')
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOneProduct(context, id) {
      axios({
        method: 'GET',
        url: `${server}/products/${id}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          context.commit("dataEditfromActions", data)
          // console.log(data, '<<<<<< actions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateProduct(context, dataObj) {
      // console.log(dataObj, '<<<<<<< data dari edit')
      axios({
        method: 'PUT',
        url: `${server}/products/${dataObj.id}`,
        headers: {
          token: localStorage.token
        },
        data: dataObj
      })
        .then(({ data }) => {
          // console.log(data, "<<<<<< data")
          context.dispatch('getAll')
          context.commit('setIsEditProductFalse')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
