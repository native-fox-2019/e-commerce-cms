<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="title">
          <span>Futsal.com</span>
        </div>
        <div class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/login" v-if="!isLogin">Sign In</router-link>
          <router-link to="/register" v-if="!isLogin">Register</router-link>
          <router-link to="/addProduct" v-if="isLogin">Add Product</router-link>
          <a href="#" v-if="isLogin" @click="logOut">LOGOUT</a>
        </div>
      </div>
    </header>
    <router-view @changeLoginStatus="changeLoginStatus" :isLogin="isLogin"
    :products="$store.state.products"/>
  </div>
</template>
<script>

export default {
  created() {
    this.$store.dispatch('getProducts');
    if (localStorage.token) {
      this.isLogin = true;
    }
  },
  data() {
    return {
      isLogin: false,
      baseUrl: 'http://localhost:3003',
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
    // deleteProduct(id) {
    //   this.products = this.products.filter((item) => item.id !== id);
    // },
  },
};
</script>
