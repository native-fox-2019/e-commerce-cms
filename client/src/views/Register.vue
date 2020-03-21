<template>
<div class="container mr-auto ml-auto">
<div><h3>Register</h3></div>
  <div class="row d-flex flex-column m-3">
    <label>Email :</label>
    <input type="text" v-model="email" />
    <label>Password :</label>
    <input :type="showPassword?'text':'password'" v-model="password" class="form-control" />
    <div class="form-group form-check">
      <input type="checkbox" v-model="showPassword" />Show Password
      <label class="form-check-label" for="exampleCheck1"></label>
    </div>
    <input type="submit" @click.prevent="registerUser" />
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
    registerUser() {
      console.log("ini email", this.email, "ini password", this.password);
      axios({
        method: "POST",
        url: "https://hidden-beyond-35816.herokuapp.com/register",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("product");
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>