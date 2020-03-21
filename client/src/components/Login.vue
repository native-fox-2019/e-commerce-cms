<template>
  <div class="boxlogin">
    <div>
      <h2>Login</h2>
    </div>
    <div>
      <form @submit.prevent="loginAction">
        <input type="email" placeholder="email" v-model="formLogin.email" />
        <hr />
        <input type="password" placeholder="password" v-model="formLogin.password" />
        <hr />
        <button type="submit" class="btnSubmit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
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
          localStorage.setItem("token", data);
          this.$router.push({
            path: "/dashboard"
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    }
  }
};
</script>

<style scoped>
.boxlogin {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.boxlogin h2 {
  color: #e84393;
  letter-spacing: 0.1em;
}
input {
  text-align: center;
  padding: 0px 2em;
  width: 15em;
  border: none;
  height: 2.5em;
  font-size: 1em;
  color: #e84393;
}
input:focus {
  outline-color: #e84393;
}
.btnSubmit {
  font-family: "Roboto", sans-serif;
  width: 10em;
  height: 2.5em;
  font-size: 1em;
  letter-spacing: 2px;
  background-color: #e84393;
  cursor: pointer;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 8px;
}
.btnSubmit:hover {
  color: #e84393;
  background-color: #2c3338;
}
</style>