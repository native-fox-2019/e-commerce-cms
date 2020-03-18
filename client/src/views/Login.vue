<template>
  <div class="about">
    <h1>This is admin login page</h1>
    <form>
        <label>Email: </label>
        <input v-model="login.email" type="email" id="emailLogin" name="emailLogin"><br>
        <label>Password: </label>
        <input v-model="login.password" type="password" id="passwordLogin" name="passwordLogin"><br>
        <input type="submit" @click="submitLogin">
    </form>
    <div>
        Please register if you don't have an account
        <button type="button" @click="registerPage">Register</button>
    </div>
  </div>
</template>
<script>
//import axios from 'axios'
export default{
  data(){
        return {
            error: '',
            login: {
              email: '',
              password: ''
            }
        }
  },
  methods:{
    submitLogin(event){
        event.preventDefault();
        console.log(this.login)
    }
  }
  

}
</script>