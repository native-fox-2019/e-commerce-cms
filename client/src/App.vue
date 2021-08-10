<template>
  <v-app>
<Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/views/Navbar.vue";

export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({
  })
};
</script>
<style scoped>
body{
  background-image: url("https://cdn.imgbin.com/11/21/22/imgbin-coffee-bean-espresso-cafe-kopi-luwak-black-beans-coffee-beans-int3YT6uaKEd4eNZMH6GUTAuU.jpg");
}
</style>