<template>
  <div class="card container my-5" style="width : 19em; border-radius : 41px; ">
    <div class="mt-2">
    <h5
      class="card-header white-text text-center py-7"
      style="border-radius : 50px; -webkit-box-shadow: inset 0px 0px 20px 0px rgba(32,252,32,0.8);
        -moz-box-shadow: inset 0px 0px 20px 0px rgba(32,252,32,0.8);
        box-shadow: inset 0px 0px 20px 0px rgba(32,252,32,0.8); "
    >

   <div style="color:black; font-size:5em; margin-bottom:-45px; margin-top:-30px">
      <i class="fab fa-aviato"></i>
   </div>
      <strong style="color: black">Sign Up</strong>
    </h5>
 </div>
    <div class="card-body px-lg-5 pt-0">
      <form class="text-center" style="color: #757575;" v-on:submit.prevent="register">
        <div class="md-form">
          <input type="text" id="first_name" class="form-control" required v-model="input_firstname" />
          <label for="first_name">first name</label>
        </div>
        <div class="md-form">
          <input type="text" id="last_name" class="form-control" required v-model="input_lastname"/>
          <label for="first_name">last name</label>
        </div>

        <div class="md-form">
          <input type="email" id="email" class="form-control" required v-model="input_email" />
          <label for="materialLoginFormEmail">email</label>
        </div>

        <div class="md-form">
          <input type="password" id="materialLoginFormPassword" class="form-control" required v-model="input_password" />
          <label for="materialLoginFormPassword">password</label>
        </div>

        <!-- Sign in button -->
        <button
          class="btn btn-outline-success btn-rounded btn-block my-4 waves-effect z-depth-0"
          type="submit"
          style="border-radius:50px;"
        >Sign Up</button>

        <p style="margin-bottom: -2px">
          Back to Page
        </p>
          <a class="text-success" href @click.prevent="backToLogin" >Login</a>
      </form>
    </div>
  </div>
</template>


<script>
import Vue from "vue"
import axios from "axios"
import url from "../../config/config"
import Swal from "sweetalert2"
export default Vue.extend({
name : "Register",
data() {
  return {
    input_firstname : "",
    input_lastname : "",
    input_email : "",
    input_password : ""
  }
},
created () {

},
methods : {
  register() {
    axios({
      url : `${url}/user/register`,
      method : 'POST',
      data : {
        first_name: this.input_firstname,
        last_name:this.input_lastname,
        email : this.input_email,
        password : this.input_password
      }
    })
    .then(data => {
      this.backToLogin()
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Hey ${data.data.first_name} ${data.data.last_name}, you just need to login`,
      showConfirmButton: false,
      timer: 3000
      })
    })
    .catch(err => {
      const msg = err.response.data.message.join(', ')
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${msg}`,
        footer: 'app made by love 💖'

      });
      
    })
    
  },
  backToLogin() {
    this.$router.push({path : '/login'})
  }
}
})
</script>