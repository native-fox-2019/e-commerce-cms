<template>
    <div>
        <Navbar></Navbar>
        <div style="display:flex; justify-content:center;">
            <div style="text-align: center; padding: 20px 40px; max-width: 600px;">
                <h5>Log In</h5>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" class="form-control" v-model="form.email">
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" class="form-control" v-model="form.password">
                    </div>
                    <input class="btn btn-success mt-2 mb-5" type="submit" value="Sign Up">
                </form>
                <span>Don't have an account?</span>
                <router-link to="/register" class="btn btn-dark m-2">Register</router-link>
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

</style>
