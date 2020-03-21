<template>
  <div id="app">
    <div id="nav">
      <a href="" @click.prevent="logout" v-if="$store.state.isLogin">Logout</a> | 
      <router-link to="/product">Product</router-link>
    </div>
    <div class="container">
    <router-view />
    </div>
    
  </div>
</template>

<script>
export default {
  created(){
    var token=localStorage.getItem('token');
    if(token){
      this.$store.state.isLogin=true;
    }
    else{
      this.$store.state.isLogin=false;
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/login');
      this.$store.state.isLogin=false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
