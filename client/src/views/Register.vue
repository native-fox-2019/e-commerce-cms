<template>
    <div>
        <Navbar></Navbar>
        <div style="display:flex; justify-content:center;">
            <div style="text-align: center; padding: 20px 40px; max-width: 600px;">
                <h5>Register New Account</h5>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label>Username:</label>
                        <input type="text" class="form-control" v-model="form.username">
                    </div>
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
                <span>Already have an account?</span>
                <router-link to="/login" class="btn btn-dark m-2">Go To Login</router-link>
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
  name: 'Register',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitForm() {
      console.log('Register!');
      appAxios({
        method: 'POST',
        url: '/user/register',
        data: this.form,
      })
        .then((data) => {
          console.log('New user:');
          console.log(data);
          this.$router.push('/login');
          this.resetForm();
        })
        .catch((err) => {
          console.log('Error:', err);
          this.$swal('Try again!', err.response.data.message, 'error');
        });
    },
    resetForm() {
      this.form.username = '';
      this.form.email = '';
      this.form.password = '';
    },
  },
};
</script>

<style scoped>

</style>
