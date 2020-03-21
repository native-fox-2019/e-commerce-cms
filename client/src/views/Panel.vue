<template>
  <div>
    <img alt="logo" src="../assets/logowatch.png">
    <div class="panel">
    <h3> Welcome Back Admin! </h3>
              <router-link to="/view">
              <input type="button" class="btn btn-dark" value="View Product">
              </router-link>
              <router-link to="/add">
              <input type="button" class="btn btn-dark" value="Add Product">
              </router-link>
              <input type="button" class="btn btn-warning" value="Logout" v-on:click="logout">
    </div>
  </div>
</template>
<script>


export default {
  name: 'Panel',
  data() {
    return {
      baseUrl: 'https://rocky-bayou-33894.herokuapp.com',
      email: '',
      password: '',
    };
  },
  Components: {

  },
  created() {

  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$store.state.token = null;
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
<style scoped>
.panel {
  border-color: black;
  border-style : double;
  width: 35%;
  text-align: center;
  margin : 20px auto;
  background: white;
  padding: 15px;
}
.btn-dark {
  margin-top: 20px;
  margin-left : 15px;
  padding-left: 15px;
}
.btn-warning {
  margin-top: 20px;
  margin-left : 15px;
  padding-left: 15px;
}
img{
  width: 20%;
  height: 20%;
}
</style>
