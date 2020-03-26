<template>
  <div>
     <img alt="Vue logo" src="../assets/logo.png" style="width : 15%">
      <h2>Admin Login</h2>
        <div class="container" style="width : 30%">
          <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="email_login">Email:</label>
              <input type="email" class="form-control" v-model="email_login" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password:</label>
              <input type="password" class="form-control" v-model="password_login" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
let url = 'https://powerful-meadow-02119.herokuapp.com'
// let url = 'http://localhost:3000'
export default {
  data () {
    return {
      email_login: null,
      password_login: null
    }
  },
  methods: {
    login(){
      axios({
        method : 'post',
        url : `${url}/users/loginadmin`,
        data : {
          email : this.email_login,
          password : this.password_login
        }
      })
      .then(response =>{
        let timerInterval
        Swal.fire({
          title: `Welcome, ${response.data.name}`,
          timer: 1100,
          timerProgressBar: true,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('name', response.data.name)
        this.$router.push({
          path : '/'
        })
      })
      .catch(err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
        })
      })
    }
  }
}
</script>
