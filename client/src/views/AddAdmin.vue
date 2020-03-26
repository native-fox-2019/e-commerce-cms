<template>
  <div>
    <NavBar />
    <img alt="Vue logo" src="../assets/logo.png" style="width : 15%">
      <h2>Add New Admin</h2>
        <div class="container" style="width : 30%">
          <form v-on:submit.prevent="register">
            <div class="form-group">
              <label for="email_register">Name:</label>
              <input type="text" class="form-control" v-model="name_register" required>
            </div>
            <div class="form-group">
              <label for="email_register">Email:</label>
              <input type="email" class="form-control" v-model="email_register" required>
            </div>
            <div class="form-group">
              <label for="password_register">Password:</label>
              <input type="password" class="form-control" v-model="password_register" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Confirm Password:</label>
              <input type="password" class="form-control" v-model="confirm_password_register" required>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Supervisor Password:</label>
              <input type="password" class="form-control" v-model="supervisor_password" required>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2'
let url = 'https://powerful-meadow-02119.herokuapp.com'
// let url = 'http://localhost:3000'
export default {
  components : {
    NavBar
  },
  data() {
    return {
      name_register : null,
      email_register : null,
      password_register : null,
      confirm_password_register : null,
      supervisor_password : null
    };
  },
  methods : {
    register(){
      if(this.password_register === this.confirm_password_register){
        axios({
          method : 'post',
          url : `${url}/users/registeradmin`,
          data : {
            name : this.name_register,
            email : this.email_register,
            password : this.password_register,
            superpassword : this.supervisor_password
          }
        })
        .then(response=>{
          let timerInterval
          Swal.fire({
          title: `Successful add new admin ${response.data}`,
          timer: 1500,
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
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
            this.$router.push({
              path : '/'
            })
          })
        })
        .catch(err=>{
          if(err.response.status === 403){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Wrong Password, Contact Your Supervisor`,
            })
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Incorrect New Password`,
        })
      }
    }
  }
};
</script>