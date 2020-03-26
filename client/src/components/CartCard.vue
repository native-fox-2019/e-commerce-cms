<template>
    <div>
        <div>
            <div v-if="!editMode">
                <h1>ID: {{ cart.id }}</h1>
                <p>Quantity: {{ cart.quantity }}</p>
                <p>Status: {{ cart.status }}</p>
                <span
                    v-if="isCustomer"
                    v-on:click="switchEditMode"
                    class="btn btn-warning">
                    Edit Cart
                </span><br>
                <span
                    v-if="isCustomer"
                    v-on:click="confirmDelete"
                    class="btn btn-danger">
                    Remove Cart
                </span><br>
                <span
                    v-if="isCustomer"
                    v-on:click="confirmCheckOut"
                    class="btn btn-success">
                    Check Out
                </span><br>
            </div>
            <div v-if="editMode">
                <div>
                    <h5 class="text-center">Edit Existing Cart</h5>
                    <form v-on:submit.prevent="editCartQty" class="my-1">
                        <div class="form-group">
                            <label>Number of items:</label>
                            <input type="number"
                                class="form-control"
                                step="1" min="1"
                                v-model="each.quantity">
                        </div>
                        <input class="btn btn-success" type="submit" value="Confirm">
                    </form>
                    <span
                      v-on:click="switchEditMode"
                      class="btn btn-dark">
                      Cancel
                    </span><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import appAxios from '../config/appAxios';

export default {
  name: 'CartCard',
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
    switchEditMode() {
      if (!this.editMode) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    },
    editCartQty() {
      console.log('Edit cart:', this.each.id);
      appAxios({
        method: 'PUT',
        url: `/carts/${this.each.id}`,
        data: { quantity: this.each.quantity },
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then(() => {
          this.switchEditMode();
          this.$router.push('/user');
        })
        .catch((err) => {
          // console.log('Error:', err.response);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message || 'Something went wrong!',
          });
          this.switchEditMode();
        });
    },
    confirmCheckOut() {
      this.$swal.fire({
        icon: 'warning',
        title: 'You sure you want to check out this cart?',
        text: 'Orders cannot be cancelled!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Check Out',
      })
        .then((answer) => {
          console.log('Answer:', answer);
          if (answer.value) {
            appAxios({
              method: 'PUT',
              url: `/carts/${this.each.id}`,
              data: {
                quantity: this.each.quantity,
                status: 'checkout',
              },
              headers: {
                token: localStorage.getItem('token'),
              },
            })
              .then(() => {
                this.editMode = false;
                this.$router.push('/user/carts/history');
              })
              .catch((err) => {
                // console.log('Error:', err.response);
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
    confirmDelete() {
      this.$swal.fire({
        icon: 'warning',
        title: 'You sure you want to remove this cart?',
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
                this.$swal.fire({
                  icon: 'success',
                  title: 'Delete successful!',
                  text: 'You just deleted this cart',
                });
                console.log('Deleted this cart:', result);
                this.$router.push('/user');
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
    // refreshParent(callback) {
    //   this.$parent.refreshCartList(callback);
    // },
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
