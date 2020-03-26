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
import Swal from 'sweetalert2';

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
          if (localStorage.getItem('level') === 'admin') {
            this.$store.commit('toggleLoginAdmin');
            this.$store.dispatch('adminLogin');
            this.$router.push('/adminpage');
          } else {
            this.$store.commit('toggleLoginUser');
            this.$store.dispatch('userLogin');
            this.$router.push('/');
          }
        })
        .catch((err) => {
          if (Array.isArray(err.response.data.msg)) {
            console.log('masuk sini');
            const arrError = [];
            for (let i = 0; i < err.response.data.msg.length; i += 1) {
              arrError.push(err.response.data.msg[i]);
            }
            console.log(arrError, 'ini array');
            Swal.fire({
              icon: 'error',
              title: 'cannot login',
              html: `<span>${arrError.join('<br>')}</span>`,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'cannot login',
              html: `<span>${err.response.data.msg}</span>`,
            });
          }
        });
    },
  },
};
</script>
