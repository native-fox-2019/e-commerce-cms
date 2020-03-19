<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="text-align:center;">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="" @click.prevent="home">Motorcycle Build And Repair<span class="sr-only">(current)</span></a>
        </div>
      </div>
      <h5 class="pr-3 mt-2">Welcome back, {{name}}</h5>
      <a class="btn btn-info ml-1" @click.prevent="addAdmin">Add Admin</a>
      <a class="btn btn-warning ml-3" @click.prevent="logout">Logout</a>
    </nav>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data(){
      return {
        name : localStorage.getItem('name')
      }
    },
    methods : {
      home(){
        this.$router.push({
          path: '/'
        })
      },
      addAdmin(){
        this.$router.push({
          path: '/addadmin'
        })
      },
      logout(){
        let timerInterval
        Swal.fire({
          title: `See you, ${this.name}`,
          // html: 'I will close in <b></b> milliseconds.',
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
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          localStorage.removeItem('token')
          localStorage.removeItem('name')
          this.$router.push({
            path: '/login'
          })
        })
      }
    }
}
</script>