<template>
  <div class="about">
    <h1>This is admin login page</h1>
    <form>
        <div class="form-group">
          <label>Email address: </label><br>
          <input  v-model="login.email" type="email" style="width: 50%" placeholder="input e-mail">
        </div>
        <div class="form-group">
          <label>Password: </label><br>
          <input  v-model="login.password" type="password" style="width: 50%" placeholder="input password">
        </div>
        <button @click="submitLogin" type="submit" class="btn btn-primary">Login</button>
    </form>
    <div style="margin-top:20px">
        Please register if you don't have an account
        <router-link to="/register"><button type="button" class="btn btn-primary">Register</button></router-link>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let local = "http://localhost:3000"
export default {
  data(){
        return {
            error: '',
            login: {
              email: '',
              password: ''
            }
        }
  },
  created(){
      let token=localStorage.getItem('token')
      if(token){
           window.location.replace('/myproduct')
      }
  },
  methods:{
    submitLogin(event){
        event.preventDefault();
        console.log(this.login)
        axios.post(`${local}/user/login`, this.login)
        .then(result=>{
            let token = result.data.token
            console.log(token)
            localStorage.setItem("token", token)
            window.location.replace('/myproduct')
        })
        .catch(err=>{
          console.log(err.response)
            this.error = err.response
        })
    }
  }
  
}
</script>

<style>
label {
  font-weight: bold
}
</style>