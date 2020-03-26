<template>
  <div>
    <div class="row">
      <div class="col-6">
        <img src="https://previews.123rf.com/images/dizanna/dizanna1606/dizanna160600339/57527727-cms-content-management-system-word-cloud-business-concept-background.jpg" alt="your logo" style="margin-top:150px; width:100%;">
      </div>
      <div class="col-6">
        <div class="container login-form" style="margin-top:190px;">
          <form @submit.prevent="doRegister">
            <h2 class="text-center">Admin Registration</h2>
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
              <input
                type="password"
                class="form-control"
                placeholder="Secret password"
                v-model="password_super"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">
                Create admin
              </button>
            </div>
          </form>
          <router-link class="text-black" to="/"
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
      password: ``,
      password_super: ''
    };
  },
  created() {
    this.epmty()
  },
  methods: {
    doRegister() {
      if (this.password_super !== 'jadiadmindong') {
        Swal.fire({
          icon:'warning',
          title:'Invalid secret password'
        })
        throw new Error
      }
      axios
        .post("https://peaceful-thicket-02203.herokuapp.com/users/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          role: 'admin'
        })
        .then(data => {
          localStorage.setItem("access_token", data.data.access_token);
          localStorage.setItem("role", data.data.role);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Hello admin ${this.name}`,
            showConfirmButton: false,
            timer: 2000
          });
          this.$router.push({ name: "Admin" });
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
    },
    epmty() {
      this.name = ``,
      this.email = ``,
      this.password = ``,
      this.password_super = ''
    }
  }
};
</script>
