<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <div class="title">
          <span>Futsal.com</span>
        </div>
        <div class="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/login" v-if="!$store.state.isLogin">Sign In</router-link>
          <router-link to="/register" v-if="!$store.state.isLogin">Register</router-link>
          <router-link to="/addProduct" v-if="$store.state.isLogin">Add Product</router-link>
          <a href="#" v-if="$store.state.isLogin" @click="logOut">LOGOUT</a>
        </div>
      </div>
    </header>
    <router-view/>
  </div>
</template>
<script>

export default {
  created() {
    this.$store.dispatch('getProducts');
    if (localStorage.token) {
      this.$store.commit('changeIsLogin', true);
    }
  },
  data() {
    return {
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
      this.$store.commit('changeIsLogin', false);
      this.$router.push('/');
    },
  },
};
</script>
