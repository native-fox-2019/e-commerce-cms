import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productList: null,
    token: null,
  },
  mutations: {
    viewProducts(state, params) {
      state.productList = params;
    },
  },
  actions: {
    getProducts(context) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: { token: localStorage.getItem('token') },
      })
        .then((data) => {
          context.commit('viewProducts', data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    edit(context, params) {
      swal({
        title: 'Are you sure want to edit this?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willEdit) => {
          if (willEdit) {
            axios({
              method: 'PUT',
              url: `http://localhost:3000/product/${params.id}`,
              headers: { token: localStorage.getItem('token') },
              data: {
                name: params.name,
                image_url: params.image_url,
                price: params.price,
                stock: params.stock,
              },
            })
              .then((data) => {
                console.log(data);
                swal('file has been edited! click view product to see the product again', {
                  icon: 'success',
                });
                router.push({ name: 'Panel' });
              })
              .catch((error) => {
                swal({
                  icon: 'error',
                  title: 'data can be edited! make sure you have filled the data',
                });
                console.log(error);
              });
          } else {
            swal('file edit cancelled! click view product to see the product again');
            router.push({ name: 'Panel' });
          }
          console.log('deleted');
        });
    },
    deleteProduct(context, id) {
      swal({
        title: 'Are you sure want to delete this?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios({
              method: 'DELETE',
              url: `http://localhost:3000/product/${id}`,
              headers: { token: localStorage.getItem('token') },
            })
              .then((data) => {
                console.log(data);
                context.dispatch('getProducts');
              })
              .catch((error) => {
                console.log(error);
              });
            swal('file has been deleted!', {
              icon: 'success',
            });
          } else {
            swal('deleting file cancelled!');
            router.push({ name: 'Panel' });
          }
          console.log('deleted');
        });
    },

  },
  modules: {
  },
});
