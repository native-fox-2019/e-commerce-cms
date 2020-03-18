<template>
  <div>
    <div class="row">
      <div class="col-6">
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30143358/128.png"
          alt="your logo"
          style="margin-top:150px;"
        />
      </div>
      <div class="col-6">
        <div class="container login-form" style="margin-top:300px;">
          <form @submit.prevent="doRegister">
            <h2 class="text-center">Register</h2>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Name"
                v-model="name"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
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
                Create your free account
              </button>
            </div>
          </form>
          <router-link class="text-black" to="/login"
            >Have an account? Login here</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Register",
  data() {
    return {
      name: ``,
      email: ``,
      password: ``
    };
  },
  created() {},
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
          localStorage.setItem("role", data.data.role);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for registering",
            showConfirmButton: false,
            timer: 2000
          });
          this.$router.push({ name: "Product" });
        })
        .catch(response => {
          if (response.response.data.msg) {
            Swal.fire({
              icon: "error",
              text: response.response.data.msg
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Please fill all the fields"
            });
          }
        });
    }
  }
};
</script>
