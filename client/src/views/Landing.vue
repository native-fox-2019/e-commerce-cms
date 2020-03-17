<template>
  <div>
      <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label>Email</label>
      <input v-model="email" type="email">
      <label>Password</label>
      <input v-model="password" type="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: mapGetters(['accessToken']),
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      await this.login({ email: this.email, password: this.password });
      localStorage.setItem('access_token', this.accessToken);
      this.$router.push({ path: '/products' });
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
