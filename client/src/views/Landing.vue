<template>
  <div>
      <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label>Email</label>
      <input v-model="email" type="email">
      <label>Password</label>
      <input v-model="password" type="password">
      <Error v-if="errors" :errors="errors" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Error from '../components/Error.vue';

export default {
  name: 'Login',
  components: {
    Error,
  },
  data() {
    return {
      email: '',
      password: '',
      errors: null,
    };
  },
  computed: mapGetters(['accessToken']),
  watch: {
    email() {
      this.errors = null;
    },

    password() {
      this.errors = null;
    },
  },
  methods: {
    ...mapActions(['login', 'checkSuperAdmin']),
    async onSubmit() {
      try {
        document.body.style.cursor = 'wait';
        await this.login({ email: this.email, password: this.password });
        localStorage.setItem('token', this.accessToken);
        await this.checkSuperAdmin(localStorage.getItem('token'));
        this.$router.push({ path: '/products' });
      } catch (err) {
        this.errors = err.message;
      }
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
    cursor: pointer;
  }
</style>
