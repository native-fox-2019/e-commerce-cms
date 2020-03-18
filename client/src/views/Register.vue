<template>
<div style="height:100vh">
  <div class="login-form" style="margin-top:300px;">
    <form @submit.prevent="doRegister">
      <h2 class="text-center">Register</h2>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          required="required"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          required="required"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          required="required"
          v-model="password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Create your free account</button>
      </div>
    </form>
    <router-link class="text-black" to="/login"
      >Have an account? Login here</router-link
    >
  </div>
</div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  name: "Register",
  data() {
    return {
      name: ``,
      email: ``,
      password: ``
    };
  },
  created() {
  },
  methods: {
    doRegister() {
      axios
        .post("http://localhost:3000/users/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(data => {
          localStorage.setItem("access_token", data.data.access_token);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thank you for registering',
            showConfirmButton: false,
            timer: 2000
          })
          this.$router.push({ name: "Product" });
        })
        .catch(response => {
            if(response.response.data.msg){
                Swal.fire({
                      icon: 'error',
                      text: response.response.data.msg
                  })
            } else {
                Swal.fire({
                      icon: 'error',
                      text: 'Please fill all the fields'
                  })
            }
        });
    }
  }
};
</script>
