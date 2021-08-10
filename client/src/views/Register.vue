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
  <h1>Register Page</h1>
    
    <v-text-field
      v-model="username"
      label="Username"
      required
    ></v-text-field>

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
    
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="registerSubmit"
    >
      Register
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
// import axios from 'axios';
  export default {
    name: 'LoginPage',
    data: () => ({
      valid: true,
      username: '',
      email: '',
      password: '',
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
      registerSubmit(){
        this.$axios({
          url: '/users/register',
          method: "POST",
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
        .then(({ data }) => {
            this.$router.push({path: "/login" })
        })
        .catch(({response}) =>{
          console.log(response.data);
        })
      }
    },
  }
</script>
<style>

</style>