<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="text-align:center;">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
        </div>
      </div>
      <a class="btn btn-warning" @click.prevent="logout">Logout</a>
    </nav>
  </div>
</template>

<script>
export default {
    data(){
      return {

      }
    },
    methods : {
      logout(){
        localStorage.removeItem('token')
        this.$router.push({
          path: '/login'
        })
      }
    }
}
</script>