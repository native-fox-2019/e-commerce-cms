<template>
    <v-toolbar
      color="indigo"
      dark
      style="
      position: fixed;
      z-index: 2;
      width: 100vw;
      "
    >
      <v-toolbar-title>Coffee-Bar</v-toolbar-title>

      <v-spacer></v-spacer>
      <div  class="icon-container">
          <loginBtn v-if="token ? false : true"></loginBtn>
          <!-- <registerBtn v-if="token ? false : true"></registerBtn> -->
          <logoutBtn v-if="token ? true : false" v-on:logOut="logOut"></logoutBtn>
          <backToAdminHome  v-if="token && !changePage ? true : false" v-on:toAdmin="toAdmin"></backToAdminHome>
          <backToHome  v-if="token && changePage ? true : false" v-on:toHome="toHome"></backToHome>          
        </div>
    </v-toolbar>
</template>

<script>
import loginBtn from '../components/loginBtn.vue';
// import registerBtn from '../components/registerBtn.vue';
import logoutBtn from "../components/logoutBtn.vue";
import backToAdminHome from '../components/backToAdminHome.vue';
import backToHome from '../components/backToHome.vue';

export default {
  name: "loginPage",
  data() {
    return {
      changePage: true
    }
  },
  components: {
    loginBtn,
    // registerBtn,
    logoutBtn,
    backToAdminHome,
    backToHome
  },
  computed: {
    token() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    toLoginPage() {
      this.$router.push({name: "Login"})
    },
    logOut() {
      localStorage.removeItem("token")
      this.$router.push({name: 'Home'})
    },
    toAdmin() {
      this.$router.push({path: '/admins'})
      this.changePage = true
    },
    toHome() {
      this.$router.push({name: 'Home'})
      this.changePage = false
    }
  }
}
</script>
<style>
.icon-container{
  width: 200px;
  display: flex;
  justify-content: space-around;
}
</style>