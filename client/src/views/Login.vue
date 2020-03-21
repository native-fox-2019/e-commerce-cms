<template>
  <div style="
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.5);
    margin-left: 50vh;
    width: 50vw;
    justify-content: center;
    ">

  <v-form
    style="
    margin-top: 70px;
    "
    ref="form"
    class="container"
  >
  <h1>Login</h1>

    <v-alert v-if="err" type="error">
      {{errMsg}}
    </v-alert>

    
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      type=password
      v-model="password"
      label="Password"
      required
    ></v-text-field>
    <v-text-field
      type=password
      v-model="secret"
      label="*SECRET CODE IF YOU'ARE AN ADMIN. IF YOU'RE NOT? JUST LET IT EMPTY."
      required
    ></v-text-field>
    
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="loginSubmit"
    >
      Login
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="goHome"
    >
      Back to home
    </v-btn>
  </v-form>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    err: false,
    valid: true,
    email: '',
    password: '',
    secret: '',
    errMsg: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),

  methods: {
    goHome() {
      this.$router.push({name:'Home'})
    },
    loginSubmit(){
      if (this.secret === "im admin yo!") {
        this.$axios({
          url: '/admins/login',
          method: "POST",
          data: {
            email: this.email,
            password: this.password
          }
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('token', data.token)
            this.$router.push({ name: "AdminPage"})
            this.$store.commit('setToken')
        })
        .catch(({response}) =>{
          console.log(response);
          this.errMsg="Wrong Username/Password!"
          this.err = true
        })        
      } else {
            this.errMsg="Wrong Secret Code!!"
            this.err = true
            // this.$router.push({name: "Home" })
          }
      // else if (this.secret === "") {
      //     this.$axios({
      //     url: '/users/login',
      //     method: "POST",
      //     data: {
      //       email: this.email,
      //       password: this.password
      //     }
      //   })
      //   .then(({ data }) => {
      //     console.log(data);
      //     localStorage.setItem('token', data.token)
      //       this.$store.commit('setToken')
      //       this.$router.push({name: "Home" })
      //   })
      //   .catch(({response}) =>{
      //     console.log(response);
      //   })
    }
  },
}
</script>
<style>

</style>