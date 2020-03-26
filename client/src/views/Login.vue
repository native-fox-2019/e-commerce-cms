<template>
<div>
    <div class="alert alert-danger" role="alert" v-if="alert">
      {{ this.msg }}
    </div>
    <div class="login">
    <h3> Login </h3>
          <form id="form-login" action="" method="POST">
              <label for="fname">Email:</label><br>
              <input type="text" id="email" name="email" value="" v-model="email" required><br>
              <label for="lname">Password:</label><br>
              <input type="password" name="password" value="" v-model="password" required><br><br>
              <input type="submit" class="btn btn-dark" value="Submit" v-on:click.prevent="login">
          </form>
    </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      alert: false,
      msg: '',
      baseUrl: 'https://rocky-bayou-33894.herokuapp.com',
      email: '',
      password: '',
    };
  },
  Components: {

  },
  created() {

  },
  methods: {
    login() {
      axios({
        method: 'POST',
        url: `${this.baseUrl}/user/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      })
        .then((data) => {
          localStorage.setItem('token', data.data.token);
          this.$store.state.token = localStorage.getItem('token');
          this.$router.push({ name: 'Panel' });
        })
        .catch(() => {
          this.alert = true;
          this.msg = 'Wrong Email/Password!';
        });
    },
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400&display=swap);
.login {
  border-color: black;
  border-style : double;
  width: 20%;
  text-align: center;
  font-family: 'Lato';
  font-weight: 300;
  margin : 100px auto;
  background: white;
  padding: 15px;
}
</style>
