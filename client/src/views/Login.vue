<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <form class="login100-form validate-form p-l-55 p-r-55 p-t-178" @submit.prevent="login">
          <img src="../images/logo.png" class="login100-form-title" />

          <div class="wrap-input100 validate-input m-b-16" style="margin-top:50px;">
            <input v-model="email" class="input100" type="text" name="email" placeholder="Email" />
            <span class="focus-input100"></span>
          </div>

          <div class="wrap-input100 validate-input">
            <input
              v-model="password"
              class="input100"
              type="password"
              name="pass"
              placeholder="Password"
            />
            <span class="focus-input100"></span>
          </div>

          <div class="container-login100-form-btn mt-5">
            <button class="login100-form-btn">Sign in</button>
          </div>

          <div class="flex-col-c p-t-65 p-b-40">
            <span class="txt1 p-b-9">Don’t have an account?</span>

            <a href class="txt3">Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axios } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        let input = {
          email: this.email,
          password: this.password
        };
        let { data } = await axios.post("/user/login", input);
        localStorage.setItem("access_token", data.access_token);
        Toast.fire({
          icon: "success",
          title: "Login successfully."
        });
        this.$router.push({
          path: "/"
        });
      } catch (error) {
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email or Password !",
            confirmButtonColor: "#39387a"
          });
        } else if (error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email or Password !",
            confirmButtonColor: "#39387a"
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        }
      }
    }
  }
};
</script>