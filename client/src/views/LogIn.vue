<template>
    <div>
        <Navbar></Navbar>
        <div style="display:flex; justify-content:center; align-items: center; min-height: 100vh;">
            <div class="log-box">
                <h1>Sign into your account!</h1>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" v-model="form.password">
                    </div>
                    <div class="btn btn-light mt-2 mb-5" style="background: #4ccc7d;">
                      <input type="submit" value="Sign In!">
                    </div>
                </form>
                <div style="text-align: center;">
                <span>Don't have an account?</span>
                <router-link to="/register" class="btn btn-dark m-2">Register now!</router-link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import appAxios from '../config/appAxios';

export default {
  name: 'Login',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log('Log in...');
      appAxios({
        method: 'POST',
        url: '/user/login',
        data: this.form,
      })
        .then((result) => {
          const { token, userProfile } = result.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userProfile', userProfile.role);
          this.$store.commit('changeToken', token);
          this.$store.commit('changeUserProfile', userProfile);
          if (userProfile.role === 'admin') this.$store.commit('changeSpecialRole', true);
          this.$store.commit('changeIsLogin', true);
          this.$router.push({ path: '/' });
          this.resetForm();
        })
        .catch((err) => {
          console.log('Error:', err.response);
          this.$swal('Try again!', err.response.data.message, 'error');
        });
    },
    resetForm() {
      this.form.email = '';
      this.form.password = '';
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

h1 {
  font-size: 2em;
  color: white;
  padding-bottom: 1em;
}

.log-box {
  color: white;
  margin: 4em 0em;
  width: 30em;
  background: #41af6b;
  padding: 2em 3em;
  border-radius: 0.5em;
}
</style>
