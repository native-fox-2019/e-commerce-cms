<template>
    <div>
        <div>
            <div v-if="!editMode">
                <h1>Cart ID: {{ cart.id }}</h1>
                <p>Item: {{ cart.Item.name }}</p>
                <p>Quantity: {{ cart.quantity }}</p>
                <p>Total Price: {{ totalPriceIDR }}</p>
                <p>Status: {{ cart.status }}</p>
                <p v-if="isAdmin">Bought by: {{ cart.User.name }} ({{ cart.UserId }})</p>
                <span
                    v-if="isAdmin"
                    v-on:click="confirmDelete"
                    class="btn btn-danger">
                    Remove Cart History
                </span><br>
            </div>
        </div>
    </div>
</template>

<script>
import appAxios from '../config/appAxios';

export default {
  name: 'Transactions',
  props: ['cart', 'item'],
  data() {
    return {
      editMode: false,
      each: {
        id: '',
        quantity: '',
        status: '',
      },
    };
  },
  created() {
    console.log('Fetch cart data:', this.cart.id);
    this.getOneCart(this.cart.id);
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
    totalPriceIDR() {
      return this.cart.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'IDR' });
    },
  },
  methods: {
    getOneCart() {
      appAxios({
        method: 'GET',
        url: `/carts/${this.cart.id}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          console.log('Cart get result:', result.data);
          this.each = result.data;
        })
        .catch((err) => {
          console.log('Error card:', err.response);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response || 'Something went wrong!',
          });
        });
    },
    confirmDelete() {
      this.$swal.fire({
        icon: 'warning',
        title: 'You sure you want to remove this transaction history?',
        text: 'This action cannot be reverted!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remove',
      })
        .then((answer) => {
          console.log('Answer:', answer);
          if (answer.value) {
            appAxios({
              method: 'DELETE',
              url: `/carts/${this.each.id}`,
              headers: {
                token: localStorage.getItem('token'),
              },
            })
              .then((result) => {
                const callback = this.$swal.fire({
                  icon: 'success',
                  title: 'Delete successful!',
                  text: 'You just deleted this record',
                });
                console.log('Deleted this cart:', result);
                this.refreshParent(callback);
              })
              .catch((err) => {
                console.log('Error:', err.response);
                this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.response.data.message || 'Something went wrong!',
                });
              });
          }
        })
        .catch(() => {
        });
    },
    refreshParent(callback) {
      this.$parent.refreshCartList(callback);
    },
  },
};
</script>

<style scoped>
#item-image{
  width:100%;
  max-width:150px;
  max-height:150px;
}

h1 {
 font-size: 16px;
 font-style: oblique;
}

p {
 font-size: 14px;
}
</style>
