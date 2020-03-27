<template>
  <div class="card container my-5" style="width : 19em; border-radius : 41px; ">
    <div class="my-2">
    <h5
      class="card-header white-text text-center py-8"
      style="border-radius : 50px; -webkit-box-shadow: inset 0px 0px 32px 9px rgba(51,181,229,0.6);
      -moz-box-shadow: inset 0px 0px 32px 9px rgba(51,181,229,0.6);
      box-shadow: inset 0px 0px 32px 9px rgba(51,181,229,0.6); "
    >

   <div style="color:black; font-size:5em; margin-bottom:-45px; margin-top:-30px">
      <i class="fab fa-aviato"></i>
   </div>
      <strong style="color: black">Sign in</strong>
    </h5>
 </div>
    <div class="card-body px-lg-5 pt-0">
      <form class="text-center" style="color: #757575;" v-on:submit.prevent="loginAct">
        <div class="md-form">
          <input type="email" id="materialLoginFormEmail" class="form-control" required v-model="input_email" />
          <label for="materialLoginFormEmail">email</label>
        </div>

        <div class="md-form">
          <input type="password" id="materialLoginFormPassword" class="form-control" required v-model="input_password" />
          <label for="materialLoginFormPassword">password</label>
        </div>

        <!-- Sign in button -->
        <button
          class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
          type="submit"
          style="border-radius:50px; border-color: rgba(32,252,32,0.6);"
        >Sign in</button>
        <p>
          Not a member?
          <a href @click.prevent="registerPage">Register</a>
        </p>
        <p>or sign in with:</p>
        <a type="button" class="btn-floating btn-git" style="color:rgb(51, 181, 229)">
          <i class="fab fa-google-plus" style="font-size:2em"></i>
        </a>
      </form>
    </div>
  </div>
</template>

<script>
   import Vue from "vue";
   import url from "../../config/config"
    import axios from 'axios'
    import Swal from 'sweetalert2'
export default Vue.extend ({
  name : 'Login',
  component : {

  },
  data() {
    return {
      input_email : "",
      input_password : ""
    }
  },
  methods : {
    registerPage() {
      this.$router.push({path : '/register'})
    },
    loginAct() {
      axios({
        url : `${url}/user/login`,
        method : 'POST',
        data : {
          email : this.input_email,
          password : this.input_password
        }
      })
      .then(data => {
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Welcome to AVIATO ${data.data.body.first_name} ${data.data.body.last_name}`,
      showConfirmButton: false,
      timer: 3000
      })
      localStorage.setItem('token', data.data.token)
      this.$router.push({path : '/'})
       
      })
      .catch(err => {
        const msg = err.response.data.message.join(', ')
        Swal.fire({
        icon: 'error',
        title: 'something wrong',
        text: `${msg}`,
        footer: 'app made by love 💖'

      });
      })
    }
  }
})
</script>