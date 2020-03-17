<template>
  <div id="app">
    <div class="header">
      <div class="header-content">
        <div class="title">
          <span>E-Commerce</span>
        </div>
        <div class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/login" v-if="!isLogin">Sign In</router-link>
          <router-link to="/register" v-if="!isLogin">Register</router-link>
          <router-link to="/addProduct" v-if="isLogin">Add Product</router-link>
          <a href="#" v-if="isLogin" @click="logOut">LOGOUT</a>
        </div>
      </div>
    </div>
    <router-view @changeLoginStatus="changeLoginStatus" :isLogin="isLogin" :baseUrl="baseUrl"
    :products="products" @addProduct="addProduct"/>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  created() {
    this.getProducts();
    if (localStorage.token) {
      this.isLogin = true;
    }
  },
  data() {
    return {
      isLogin: false,
      baseUrl: 'http://localhost:3003',
      products: [],
    };
  },
  methods: {
    changeLoginStatus(status) {
      this.isLogin = status;
    },
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      this.isLogin = false;
      this.$router.push('/');
    },
    getProducts() {
      const options = {
        url: 'http://localhost:3003/products',
        method: 'get',
      };
      axios(options)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    addProduct(product) {
      this.products.push(product);
    },
  },
};
</script>
