<template>
  <div class="register">
    <div>
      <h3>Register</h3>
      <form @submit.prevent="register">
        <input type="text" placeholder="Name" v-model="name">
        <input type="text" placeholder="Email" v-model="email"><br>
        <input type="password" placeholder="Password" v-model="password"><br>
        <button type="submit">Register</button>
      </form>
      <p style="color: red" v-for="error in registerError" :key="error"> {{ error }}</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Register',
  props: ['isLogin'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      registerError: [],
    };
  },
  methods: {
    register() {
      const options = {
        url: `${this.$store.state.baseUrl}/user/register`,
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      };
      axios(options)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          localStorage.setItem('role', response.data.role);
          this.name = '';
          this.email = '';
          this.password = '';
          this.registerError = [];
          this.$router.push('/');
          this.$store.commit('changeIsLogin', true);
        })
        .catch((err) => {
          this.registerError = [];
          if (err.response.data.error) {
            err.response.data.error.forEach((item) => {
              this.registerError.push(item.msg);
            });
          } else {
            this.registerError.push(err.response.data.msg);
          }
        });
    },
  },
};
</script>
