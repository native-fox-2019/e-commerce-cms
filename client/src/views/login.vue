<template>
<div class="container" style="max-width: 50%;">
  <h1>Login Your Account</h1>
  <LoginCard @login="login" />
</div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
import LoginCard from '../components/loginCard.vue';

const baseUrl = 'https://cryptic-oasis-44923.herokuapp.com';
export default {
  components: {
    LoginCard,
  },
  methods: {
    login(payload) {
      const obj = {
        email: payload.email,
        password: payload.password,
      };
      axios({
        method: 'POST',
        url: `${baseUrl}/users/login`,
        data: obj,
      }).then(({ data }) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
        localStorage.setItem('token', data.token);
        this.$router.push({ path: '/' });
      }).catch((err) => {
        let msg = null;
        if (err.response) {
          if (Array.isArray(err.response.data.msg)) {
            msg = err.response.data.msg.join('<br>');
          } else {
            msg = err.response.data.msg;
          }
        } else if (err.request) {
          msg = err.request;
        } else {
          msg = err.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: `${msg}`,
        });
      });
    },
  },
};

</script>
