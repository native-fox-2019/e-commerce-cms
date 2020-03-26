<template>
    <div>
        <Navbar></Navbar>
        <div class="container" style="min-height:600px;">
            <div v-if="isLoadCart">Loading...</div>
            <div v-else class="mt-5">
                <h1 style="text-align:center">All Customer's Cart List</h1>
                <hr>
                <div v-for="cart in carts" :key="cart.id" style="display: inline-block">
                    <div :cart="cart" class="m-2 p-2 border dark rounded"
                    style="width:200px; height:200px">
                      <h5>Cart ID: {{ cart.id }}</h5>
                      <p>Item: {{ cart.Item.name }}</p>
                      <p>Quantity: {{ cart.quantity }}</p>
                      <p>Status: {{ cart.status }}</p>
                      <p>User ID: {{ cart.UserId }}</p>
                    </div>
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
  name: 'AllCartsList',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      isLoadCart: true,
      allUsersCarts: [],
      currentCart: null,
    };
  },
  created() {
    appAxios({
      method: 'GET',
      url: '/carts',
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      .then((result) => {
        // console.log('result', result);
        this.allUsersCarts = result.data;
        this.finishLoading();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    finishLoading() {
      this.isLoadCart = false;
    },
  },
  computed: {
    carts() {
      return this.allUsersCarts;
    },
  },
};
</script>
