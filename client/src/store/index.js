import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Swal from 'sweetalert2'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        isLogin: localStorage.getItem("access_token"),
        rootUrl: process.env.VUE_APP_ROOTURL,
        product_temp: {
            id: '',
            name: '',
            image_url: '',
            stock: '',
            price: ''
        },
        user_info: {},
        isLoading: false
    },
    mutations: {
        setData: function (state, payload) {
            state.products = payload;
        },
        setUser: function (state, payload) {
            state.user_info = payload
        },
        addData: function (state, payload) {
            state.products.push(payload)
        },
        editData: function (state, payload) {
            for (let i = 0; i < state.products.length; i++) {
                if (state.products[i].id == payload.id) {
                    state.products[i] = payload
                }
            }
            state.product_temp = {
                id: '',
                name: '',
                image_url: '',
                stock: '',
                price: ''
            }
        },
        deleteData: function (state, payload) {
            let temp = state.products.filter(data => data.id != payload)
            state.products = temp
        }
    },
    actions: {
        getAllProduct: function (context) {
            Axios({
                    method: 'get',
                    url: `${this.state.rootUrl}/product`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                })
                .then(result => {
                    context.commit('setData', result.data.data);
                    context.commit('setUser', result.data.user);
                })
                .catch(err => {
                    context.dispatch('errHandler', err.response)
                });
        },
        errorHandler: function (context, err_payload) {
            this.state.isLoading = false
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `${(Array.isArray(err_payload.data.message))?err_payload.data.message.join(' And '):err_payload.data.message}`
            })
        }
    }
});