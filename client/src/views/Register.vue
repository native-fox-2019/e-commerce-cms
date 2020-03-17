<template>
  <div>
      <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <label>Name</label>
      <input v-model="name" type="text">
      <label>Email</label>
      <input v-model="email" type="email">
      <label>Password</label>
      <input v-model="password" type="password">
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    ...mapActions(['register']),
    onSubmit() {
      this.register({ name: this.name, email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
  * {
    margin-top: 10px;
  }

  form {
    display:grid;
  }

  label {
    margin: 0px 30px;
  }

  input {
    height: 20px;
    width: 200px;
    margin: 10px auto;
    text-align: center;
  }

  button {
    height: 30px;
    width: 100px;
    margin: 10px auto;
    border-radius: 20px;
    border-color: salmon;
  }
</style>
