<template>
    <div>
        <Navbar></Navbar>
        <div class='container' style="display:flex; justify-content:center">
          <div>
            <router-link v-if="isCustomer" to="/user">
                <span
                    class="btn btn-dark m-2">
                    Go Back to Profile
                </span>
            </router-link>
            <router-link v-if="isCustomer" to="/user/carts">
                <span
                    class="btn btn-dark m-2">
                    Go To Carts
                </span>
            </router-link>
          </div>
        </div>
        <div class="container" style="min-height:600px; text-align:center">
            <hr>
              <h1>Your Transaction History</h1>
            <hr>
            <div v-if="isLoadHistory">Loading...</div>
            <div v-else class="mt-5">
                <div v-for="cart in carts" :key="cart.id" style="display: inline-block">
                    <Transaction :cart="cart"
                    class="m-2 p-2 border dark rounded"
                    style="width:200px"></Transaction>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Transaction from '@/components/Transaction.vue';
import Footer from '@/components/Footer.vue';
import appAxios from '../config/appAxios';

export default {
  name: 'AllCarts',
  components: {
    Navbar,
    Transaction,
    Footer,
  },
  data() {
    return {
      isLoadHistory: true,
      cartHistory: [],
      currentCart: null,
    };
  },
  computed: {
    carts() {
      return this.cartHistory;
    },
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
    this.refreshCartList(this.finishLoading);
  },
  methods: {
    finishLoading() {
      this.isLoadHistory = false;
    },
    refreshCartList() {
      appAxios({
        method: 'GET',
        url: '/carts/user/history',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          console.log('result', result);
          this.cartHistory = result.data;
          console.log(this.cartHistory);
          this.finishLoading();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
