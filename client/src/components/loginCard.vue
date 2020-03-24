<template>
<div class="container">
    <form @submit.prevent="login">
    <div class="form-group">
        <label>Email address</label>
        <input type="email" class="form-control" v-model="email" >
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <button type="button" class="btn btn-primary m-2" @click.prevent="demoAccount">
      Demo Account
    </button>
    </form>
</div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = { email: this.email, password: this.password };
      this.$emit('login', data);
    },
    demoAccount() {
      Swal.fire({
        title: '<strong>This is demo account for this application</strong>',
        icon: 'info',
        html:
          '<h3> Demo account for Admin </h3> '
          + '<p> Email: admin@admin.com </p> '
          + '<p> Password: admin </p> '
          + '<h3> Demo account for User </h3> '
          + '<p> Email: user@user.com </p> '
          + '<p> Password: user </p> ',
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Okay!',
      });
    },
  },
};
</script>
