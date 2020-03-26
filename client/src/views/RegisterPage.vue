<template>
  <div>
    <div id="divlogin" class="container">
      <h2>Register</h2>
      <form v-on:submit.prevent="submitregister" id="register-form">
        <div class="form-group">
          <label for="usr">Email:</label>
          <input
            v-model="registeremail"
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
            v-model="registerpassword"
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
      registeremail: ``,
      registerpassword: ``
    };
  },

  methods: {
    submitregister() {
      axios({
        method: "post",
        url: `http://localhost:3000/users/register`,
        data: {
          email: this.registeremail,
          password: this.registerpassword,
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