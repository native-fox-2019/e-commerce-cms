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
          <router-link to="/register" v-if="isLogin">Add Product</router-link>
          <a href="#" v-if="isLogin" @click="logOut">LOGOUT</a>
        </div>
      </div>
    </div>
    <router-view @changeLoginStatus="changeLoginStatus" :isLogin="isLogin"/>
  </div>
</template>
<script>
export default {
  created() {
    if (localStorage.token) {
      this.isLogin = true;
    }
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    changeLoginStatus(status) {
      this.isLogin = status;
    },
    logOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.isLogin = false;
      this.$router.push('/');
    },
  },
};
</script>
