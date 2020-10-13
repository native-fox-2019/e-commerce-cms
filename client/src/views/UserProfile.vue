<template>
    <div>
        <Navbar></Navbar>
        <div class='container' style="display:flex; justify-content:center">
          <div>
            <router-link v-if="isCustomer" to="/user/carts">
                <span
                    class="btn btn-dark m-2">
                    Go To Carts
                </span>
            </router-link>
            <router-link v-if="isCustomer" to="/user/carts/history">
                <span
                    class="btn btn-dark m-2">
                    Go To Transaction History
                </span>
            </router-link>
            <router-link v-if="isAdmin" to="/admin/carts">
                <span
                    class="btn btn-dark m-2">
                    Go To Customer's Carts
                </span>
            </router-link>
          </div>
        </div>
        <div>
          <div class="container" style="text-align:center; min-height:600px">
            <hr>
              <h1>Your Profile</h1>
            <hr>
            <div v-if="isLoadUser">Loading...</div>
            <div v-else class="mt-5">
              <h5>Username: {{user.username}}</h5>
              <h5>Status: {{user.role}}</h5>
              <h5>Email: {{user.email}}</h5>
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
  name: 'UserProfile',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoadUser: true,
      user: {
        id: '',
        username: '',
        email: '',
      },
    };
  },
  computed: {
    isAdmin() {
      if (this.$store.state.specialRole === 'admin') return true;
      return false;
    },
    isCustomer() {
      if (this.$store.state.specialRole === 'customer') return true;
      return false;
    },
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      appAxios({
        method: 'GET',
        url: '/user',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          // console.log('RESULT:', result.data);
          this.isLoadUser = false;
          this.user = result.data;
        })
        .catch((err) => {
          console.log('Error:', err.response);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response || 'Something went wrong!',
          });
        });
    },
  },
};
</script>
