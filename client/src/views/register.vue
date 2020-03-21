<template>
  <div class="d-flex justify-content-center align-items-center forms">
    <div class="box">
      <h2>Register</h2>
      <b-form @submit="onSubmit">
        <b-form-group label="Email address:" label-for="email">
          <b-form-input v-model="form.email" type="email" required placeholder="Enter email">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Password" label-for="password">
          <b-form-input
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      axios({
        url: `${this.$store.state.url}admins/register`,
        method: 'post',
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      })
        .then(({ data }) => {
          localStorage.token = data.token;
          localStorage.role = data.role;
          this.$router.push({ name: 'main' });
          this.form.email = '';
          this.form.password = '';
        })
        .catch((err) => {
          this.$store.dispatch('toast', { vm: this, message: err.response.data.status_message.join(', ') });
        });
    },
  },
};
</script>
