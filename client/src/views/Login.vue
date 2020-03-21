<template>
<div class="container mr-auto ml-auto">
    <div><h3>Login</h3></div>
  <div class="row d-flex flex-column m-3">
    <label>Email :</label>
    <input label="Email" type="text" v-model="email" />
    <label>Password :</label>
    <input :type="showPassword?'text':'password'" v-model="password" class="form-control" />
    <div class="form-group form-check">
      <input type="checkbox" v-model="showPassword" />Show Password
      <label class="form-check-label" for="exampleCheck1"></label>
    </div>
    <input type="submit" @click.prevent="loginUser" />
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },

  methods: {
    loginUser() {
      axios({
        method: "POST",
        url: "https://hidden-beyond-35816.herokuapp.com/user/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("product");
        })
    }
  }
};
</script>