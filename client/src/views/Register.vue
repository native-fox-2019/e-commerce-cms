<template>
  <div class="register">
    <div>
      <h3>Register</h3>
      <form @submit.prevent="register">
        <input type="text" placeholder="Name">
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      const options = {
        url: 'http://localhost:3003/user/register',
        method: 'post',
        data: {
          name: this.name,
          email: this.email,
          password: this.password,
        },
      };
      axios(options)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
