<template>
  <div class="login">
    <ol class="breadcrumb bc-3">
      <li>
        <router-link to="">
          <i class="fa-home"></i>Home
        </router-link>
      </li>
      <li>
        <router-link to="account">Account</router-link>
      </li>
      <li class="active">
        <strong>Login</strong>
      </li>
    </ol>
    <h2>Login</h2>
    <hr />
    <div class="row">
      <div class="col-md-12">
        <div class="panel panel-primary">
          <div class="panel-body">
            <form role="form" class="form-horizontal form-groups-bordered">
              <div class="form-group">
                <label for="email" class="col-sm-3 control-label">Email</label>
                <div class="col-sm-5">
                  <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Registered email"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Password</label>
                <div class="col-sm-5">
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Your password"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-3 col-sm-5">
                  <button v-on:click="submit" type="button" class="btn btn-primary">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import base64url from 'base64url';
import baseUrl from '../baseUrl';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    jwt() {
      return this.$store.state.jwt;
    },
  },
  methods: {
    submit() {
      axios.post(`${baseUrl}users/login`, { email: this.email, password: this.password })
        .then((response) => {
          const [,encodedPayload,] = response.data.token.split('.');
          const { isAdmin } = JSON.parse(base64url.decode(encodedPayload));
          this.$store.commit('setJwt', response.data.token);
          if (isAdmin) {
            this.$router.push('/products');
          } else {
            this.$router.push('/forbidden');
          }
        })
        .catch(() => {});
    },
  },
};
</script>
