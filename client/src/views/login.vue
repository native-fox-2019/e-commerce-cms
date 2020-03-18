<template>
<div class="container" style="max-width: 50%;">
  <h1>Login Your Account</h1>
  <LoginCard @login="login" />
</div>
</template>

<script>

import axios from 'axios';
import LoginCard from '../components/loginCard.vue';

const baseUrl = 'http://localhost:3000';
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
        localStorage.setItem('token', data.token);
        this.$router.push({ path: '/' });
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};

</script>
