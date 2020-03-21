<template>
  <div class="nav">
      <div class="navLeft">
        <router-link to="/adminregister" class="navTitle" > Das Comic's </router-link>
      </div>
      <div class="navRight">
      <router-link to="/" class="navPadding">Home</router-link>
      <router-link to="/about" class="navPadding">About</router-link>
      <router-link to="/login" class="navPadding"
      v-if="!$store.state.isLogin" >Login</router-link>

      <router-link to="/register" class="navPadding"
      v-if="!$store.state.isLogin" >register</router-link>

      <div v-else class="divelse">
      <router-link v-if="$store.state.isAdmin" to="/adminpage"
      class="navPadding">Admin Menu </router-link>
      <a class="navPadding" @click="logout">Logout</a>
      <!-- <router-link to="/login" class="navPadding"  >Logout</router-link>  -->
      </div>
      </div>
    </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('level');
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
  created() {
    console.log(this.$store.state.isLogin);
  },
};
</script>
