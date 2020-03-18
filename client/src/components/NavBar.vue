<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="text-align:center;">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Motorcycle Build And Repair<span class="sr-only">(current)</span></a>
        </div>
      </div>
      <h5 class="pr-5 mt-2">Welcome back, {{name}}</h5>
      <a class="btn btn-warning ml-3" @click.prevent="logout">Logout</a>
    </nav>
  </div>
</template>

<script>
export default {
    data(){
      return {
        name : localStorage.getItem('name')
      }
    },
    methods : {
      logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        this.$router.push({
          path: '/login'
        })
      }
    }
}
</script>