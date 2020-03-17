<template>
  <div class="login" v-if="!isLogin">
    <div>
      <h3>Sign In</h3>
      <form @submit.prevent="login">
        <input type="text" placeholder="Email" v-model="email"><br>
        <input type="password" placeholder="Password" v-model="password"><br>
        <button type="submit">Sign In</button>
      </form>
      <p style="color: red" v-if="loginError">{{ loginError }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  props: ['isLogin'],
  data() {
    return {
      email: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    login() {
      const options = {
        url: 'http://localhost:3003/user/login',
        method: 'post',
        data: {
          email: this.email,
          password: this.password,
        },
      };
      axios(options)
        .then((response) => {
          if (response.data.role === 'admin') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('role', response.data.role);
            this.email = '';
            this.password = '';
            this.loginError = '';
            this.$router.push('/');
            this.$emit('changeLoginStatus', true);
          } else {
            this.loginError = '';
            this.loginError = 'Only admin can log in';
          }
        })
        .catch((err) => {
          this.loginError = '';
          this.loginError = err.response.data.msg;
        });
    },
  },
};
</script>
