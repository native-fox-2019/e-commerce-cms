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
            <router-link v-if="isCustomer" to="/user/carts/history">
                <span
                    class="btn btn-dark m-2">
                    Go To Transaction History
                </span>
            </router-link>
          </div>
        </div>
        <div class="container" style="min-height:600px; text-align:center">
            <hr>
              <h1>Your Cart List</h1>
            <hr>
            <div v-if="isLoadCart">Loading...</div>
            <div v-else class="mt-5">
                <div v-for="cart in carts" :key="cart.id" style="display: inline-block">
                    <CartCard :cart="cart"
                    class="m-2 p-2 border dark rounded"
                    style="width:200px"></CartCard>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import CartCard from '@/components/CartCard.vue';
import Footer from '@/components/Footer.vue';
import appAxios from '../config/appAxios';

export default {
  name: 'AllCarts',
  components: {
    Navbar,
    CartCard,
    Footer,
  },
  data() {
    return {
      isLoadCart: true,
      allPendingCarts: [],
      currentCart: null,
    };
  },
  computed: {
    carts() {
      return this.allPendingCarts;
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
      this.isLoadCart = false;
    },
    refreshCartList() {
      appAxios({
        method: 'GET',
        url: '/carts/user/pending',
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          console.log('result', result);
          this.allPendingCarts = result.data;
          console.log(this.allPendingCarts);
          this.finishLoading();
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
