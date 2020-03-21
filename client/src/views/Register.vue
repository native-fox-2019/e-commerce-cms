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
      <Error v-if="errors" :errors="errors" />
      <button type="submit">Sign Up</button>
    </form>
    <h2 v-if="registered">
      {{ registered }} successfully registered
    </h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Error from '../components/Error.vue';

export default {
  name: 'Register',
  components: {
    Error,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      role: 'admin',
      errors: null,
      registered: null,
    };
  },
  computed: mapGetters(['accessToken']),
  watch: {
    name() {
      this.errors = null;
      this.registered = null;
    },

    email() {
      this.errors = null;
      this.registered = null;
    },

    password() {
      this.errors = null;
      this.registered = null;
    },
  },
  methods: {
    ...mapActions(['register']),
    async onSubmit() {
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
        };
        await this.register(userData);
        this.registered = this.name;
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
  }
</style>
