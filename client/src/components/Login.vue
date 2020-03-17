<template>
  <div>
    <form @submit.prevent="loginAction">
      <input type="email" value="email" v-model="formLogin.email" />
      <br />
      <br />
      <input type="password" value="password" v-model="formLogin.password" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
const server = `http://localhost:3000`;
export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginAction() {
      axios({
        method: "POST",
        url: `${server}/users/login`,
        data: {
          email: this.formLogin.email,
          password: this.formLogin.password
        }
      })
        .then(({ data }) => {
          console.log(data, "data<<<<<<<<< CLient");
        })
        .catch(err => {
          console.log(err, "<<<<<<< err");
        });
    }
  }
};
</script>

<style>
</style>