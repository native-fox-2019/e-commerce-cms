<template>
  <div>
    <div id="divlogin" class="container">
      <h2>Login</h2>
      <form v-on:submit.prevent="submitlogin" id="login-form">
        <div class="form-group">
          <label for="usr">Email:</label>
          <input
            v-model="loginemail"
            type="text"
            class="form-control"
            placeholder="Email"

            name="name"
            required
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            v-model="loginpassword"
            type="password"
            class="form-control"

            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
let baseURL = "http://localhost:3000";
import axios from "axios";

export default {
  components: {},
  
  data: function() {
    return {
      loginemail: ``,
      loginpassword: ``
    };
  },

  methods: {
    submitlogin() {
      axios({
        method: "post",
        url: `http://localhost:3000/users/login`,
        data: {
          email: this.loginemail,
          password: this.loginpassword,
        }
      })
        .then(result => {
          localStorage.setItem(`token`, result.data.token);
          this.$router.push('/adminPage');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>