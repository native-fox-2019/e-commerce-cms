import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        isLogin: localStorage.getItem("access_token"),
        rootUrl: 'http://localhost:3000',
        product_temp: {
            id: '',
            name: '',
            image_url: '',
            stock: '',
            price: ''
        }
    },
    mutations: {
        setData: function (state, payload) {
            state.products = payload;
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
                })
                .catch(err => {
                    console.log(err.response);
                });
        },
        // errorHandler: function (context, err_payload) {

        // }
    }
});