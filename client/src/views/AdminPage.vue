<template>
 <div class="container row" style="margin-top: 75px;">
   <sideBar class="col-2" v-on:goToProductList="goToProductList" v-on:goToAdd="goToAdd()"></sideBar>
   <router-view></router-view>
 </div>
</template>
<script>
import sideBar from "../components/sideBar.vue"
  export default {
    name: "AdminPage",
    components: {
      sideBar
    },
    created() {
      this.$store.dispatch("getAllData")
      this.$router.push({path: "/admins"})
    },
    methods: {
      goToAdd() {
        this.$router.push({path: '/admins/add'})
      },
      goToProductList() {
        this.$router.push({ path: '/admins' })
      }
    }
  }
</script>

<style>

</style>