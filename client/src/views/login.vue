<template>
  <div class="login container p-4 bg-dark text-white" style="margin-top:300px; border: 1px solid black;">
      <h1>Login Page</h1>
    <form class="mt-5" @submit.prevent="doLogin">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="form-group form-check">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  created() {

  },
  methods: {
      doLogin() {
          axios.post('http://localhost:3000/users/login', {
            email: this.email,
            password: this.password
          })
          .then(data => {
              localStorage.setItem('access_token', data.data.access_token)
          })
          .catch(err => {
              console.log(err, '<<<<<<< FROM LOGIN VUE')
          })
      }
  }
};
</script>
