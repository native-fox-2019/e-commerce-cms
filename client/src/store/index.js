import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'
import Axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productList: [],
    productFormData: {}
  },
  mutations: {
    productList(state, data) {
      state.productList = data
    },
    logout(state) {
      state.productList = []
    },
    productAdd(state, newProduct) {
      state.productList.push(newProduct)
    },
    productFind(state, found) {
      state.productFormData = found
    },
    productDelete(state, id) {
      state.productList = state.productList.filter(product => product.id !== id)
    },
    productFormReset(state) {
      state.productFormData = {}
    },
  },
  actions: {
    productList(context) {
      Axios({
        method: 'GET',
        url: 'https://mighty-stream-85910.herokuapp.com/product',
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        context.commit('productList', data)
      })
      .catch(err => {
        if (localStorage.access_token) {
          delete localStorage.access_token
          router.push({ path: '/login' })
        }
        let msg = null;
          if (err.response) {
            if (Array.isArray(err.response.data.message)) {
              msg = err.response.data.message.join('<br>');
            } else {
              msg = err.response.data.message;
            }
          } else if (err.request) {
            msg = err.request;
          } else {
            msg = err.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: `${msg}`
          })
      })
    },
    logout(context) {
      context.commit('logout');
    },
    productAdd(context, newProduct) {
        Axios({
        method: 'POST',
        url: 'https://mighty-stream-85910.herokuapp.com/product',
        headers: {
          access_token: localStorage.access_token
        },
        data: newProduct
      })
      .then(({ data }) => {
        context.commit('productAdd', data)
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productFind(context, id) {
      Axios({
        method: 'GET',
        url: 'https://mighty-stream-85910.herokuapp.com/product/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(({ data }) => {
        context.commit('productFind', data)
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productEdit({ dispatch }, { updateProduct, productId }) {
      Axios({
        method: 'PUT',
        url: 'https://mighty-stream-85910.herokuapp.com/product/' + productId,
        headers: {
          access_token: localStorage.access_token
        },
        data: updateProduct
      })
      .then(() => {
        dispatch('productList')
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productDelete(context, id) {
      Axios({
        method: 'DELETE',
        url: 'https://mighty-stream-85910.herokuapp.com/product/' + id,
        headers: {
          access_token: localStorage.access_token
        }
      })
      .then(() => {
        context.commit('productDelete', id)
      })
      .catch(err => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.message)) {
            msg = err.response.data.message.join('<br>');
          } else {
            msg = err.response.data.message;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`
        })
      })
    },
    productFormReset(context) {
      context.commit('productFormReset')
    }
  },
  getters: {
    productListDesc: state => state.productList.sort((a,b) => b.id -a.id)
  },
  modules: {
  }
})
