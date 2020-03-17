<template>
  <div id="app">
    <div id="logo">
      <img alt="Car logo" src="./assets/logo.png">
    </div>
    <div class="container" v-if="page === 'homepage'">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <HomePage />
    </div>
    <div class="login" v-if="page === 'login'">
      <LoginPage />
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomePage from './view/HomePage'
import LoginPage from './view/LoginPage'

export default {
  name: 'App',
  data () {
    return {
      page: 'login'
    }
  },
  components: {
    HomePage, LoginPage
  }
}
</script>

<style>
.container {
  /* display: flex;
  flex-flow: row; */
  /* justify-content: space-between; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.login {
  /* display: flex;
  flex-flow: row; */
  /* justify-content: space-between; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#logo{
  width: 10%;
  text-align: center;
  margin-top: 20px;
}
</style>
