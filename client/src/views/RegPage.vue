<template>
  <div class="RegPage">
    <div class="h1 my-5">Register New Account</div>
    <div class="container text-center shadow pt-3 auth-form">
      <!-- <div class="h2 mb-3"></div> -->
      <div class="form-group d-flex flex-row justify-content-start">
        <button class="btn btn-outline-secondary mx-3" @click="gotoMainPage()">↰</button>
      </div>
      <form class="container text-center" @submit.prevent="register()">
        <div class="form-group">
          <input class="form-control text-center mb-3" type="text" placeholder="Username" v-model="username">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="email" placeholder="Email" v-model="email">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="password" placeholder="Password" v-model="password">
        </div>
        <div class="form-group">
          <input class="form-control text-center mb-3" type="password" placeholder="Confirm Password" v-model="passwordConfirm">
        </div>
        <div class="form-group">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="admin" v-model="role">
            <label class="form-check-label" for="inlineRadio1">as Admin</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="user" v-model="role">
            <label class="form-check-label" for="inlineRadio2">as User</label>
          </div>
        </div>
        <div class="form-group">
          <input class="form-control btn btn-primary mb-3" type="submit" value="Register">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RegPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      role: ''
    }
  },
  methods: {
    gotoMainPage() {
      this.$router.push({
        path: '/'
      })
    },
    register() {
      if (this.password !== this.passwordConfirm) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `Your Password & Confirm Password didn't match!`
        })
        this.password = ''
        this.passwordConfirm = ''
      } else {
        Axios({
          method: 'POST',
          url: 'https://mighty-stream-85910.herokuapp.com/user/register',
          data: {
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
          },
          headers: { access_token: localStorage.access_token }
        })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Register Success!',
            html: `Username: ${data.username}
                  <br>Email: ${data.email}
                  <br>Role: ${data.role}`
          })
          this.username = ''
          this.email = ''
          this.password = ''
          this.passwordConfirm = ''
          this.role = ''
        })
        .catch(err => {
          let msg = null;
          if (err.response) {
            if (Array.isArray(err.response.data.message)) {
              msg = err.response.data.message.join('<br>');
            } else {
              msg = err.response.data.message;
            }
          } else if (err.request) {
            msg = err.request;
          } else {
            msg = err.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: `${msg}`
          })
        })
      }
    }
  }
}
</script>
