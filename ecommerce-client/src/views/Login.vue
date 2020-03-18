<template>
    <div>
        <div class="divCenter"><span class="title"> User Login </span></div>
        <div class="divCenter" style="margin-top:1%">
            <div class="border" style="padding:20px">
            <form  v-on:submit.prevent="axiosLogin(`${loginForm.email}`, `${loginForm.password}`)">
                <div class="containerForm"> <span class="textForm"> Email </span> </div>
                <div class="containerForm">
                    <input class="input inputText" type="email" placeholder="email"
                    v-model="loginForm.email">
                </div>
                <div class="containerForm"> <span class="textForm"> Password </span> </div>
                <div class="containerForm">
                    <input class="input inputText" type="password" placeholder="password"
                    v-model="loginForm.password">
                </div>
                    <div class="containerForm">
                        <input type="submit" value="Login">
                    </div>
            </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

const axiosUrl = 'http://localhost:3000';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    axiosLogin(logemail, logpassword) {
      console.log(logemail, logpassword);
      axios({
        method: 'post',
        url: `${axiosUrl}/user/login`,
        data: {
          email: logemail,
          password: logpassword,
        },
      })
        .then((data) => {
          console.log(data);
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('name', data.data.name);
          localStorage.setItem('level', data.data.level);
          this.$store.dispatch('adminLogin');
          this.$router.push('/adminpage');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
