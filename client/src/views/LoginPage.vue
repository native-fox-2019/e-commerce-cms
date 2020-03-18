<template>
  <div>
     <img alt="Vue logo" src="../assets/logo.png" style="width : 15%">
      <h2>Admin Login</h2>
        <div class="container" style="width : 30%">
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="email_login">Email:</label>
              <input type="email" class="form-control" v-model="email_login">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password:</label>
              <input type="password" class="form-control" v-model="password_login">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
let url = 'http://localhost:3000'
export default {
  data () {
    return {
      email_login: null,
      password_login: null
    }
  },
  methods: {
    login(){
      axios({
        method : 'post',
        url : `${url}/users/login`,
        data : {
          email : this.email_login,
          password : this.password_login
        }
      })
      .then(response =>{
        localStorage.setItem('token', response.data.access_token)
        this.$router.push({
          path : '/home'
        })
      })
    }
  }
}
</script>
