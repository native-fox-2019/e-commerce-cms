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
        <button><router-link to="/register">Register</router-link></button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
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
  methods:{
    submitLogin(event){
        event.preventDefault();
        console.log(this.login)
        axios.post('http://localhost:3000/user/login', this.login)
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