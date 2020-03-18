<template>
  <div>
    <div class="row">
      <div class="col-6">
        <div class="container login-form" style="margin-top:300px;">
          <form @submit.prevent="doLogin">
            <h2 class="text-center">Welcome</h2>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                Log in
              </button>
            </div>
          </form>
          <router-link class="text-black" to="/register"
            >Create an account</router-link
          >
        </div>
      </div>
      <div class="col-6">
        <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30143358/128.png" alt="your logo" style="margin-top:150px;">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      email: ``,
      password: ``
    };
  },
  created() {},
  methods: {
    doLogin() {
      axios
        .post("http://localhost:3000/users/login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("role", data.data.role);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successfull",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push({ name: "Product" });
        })
        .catch(response => {
          const error = response.response.data.msg;
          Swal.fire({
            icon: "error",
            text: error
          });
        });
    }
  }
};
</script>

<style>
.login-form {
  width: 340px;
  margin: 50px auto;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
