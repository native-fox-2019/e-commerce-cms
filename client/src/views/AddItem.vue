<template>
    <div>
        <Navbar></Navbar>
            <div class="container p-4">
                <h5 class="text-center">Add New Card</h5>
                <form v-on:submit.prevent="submitForm" class="my-4">
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text"
                            class="form-control"
                            v-model="form.name">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-control"
                            v-model="form.description">
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label>Image URL:</label>
                        <input type="text"
                            class="form-control"
                            v-model="form.image_url">
                    </div>
                    <div class="form-group">
                        <label>Price:</label>
                        <input type="number"
                            min="1" step="any"
                            class="form-control"
                            v-model="form.price">
                    </div>
                    <div class="form-group">
                        <label>Stock:</label>
                        <input type="number"
                            step="1" min="1" value="1"
                            v-model="form.stock"
                            class="form-control">
                    </div>
                    <input class="btn btn-success" type="submit">
                </form>
            </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import appAxios from '../../config/appAxios';

export default {
  name: 'AddItem',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        image_url: '',
        price: '',
        stock: '',
      },
    };
  },
  methods: {
    submitForm() {
      appAxios({
        method: 'POST',
        url: '/items',
        data: this.form,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          console.log('Added this item:', result);
          this.emptyForm();
          this.$router.push('/');
          // this.$router.push(`/item/${result.id}`);
        })
        .catch((err) => {
          console.log('Error:', err.response);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message,
          });
        });
    },
    emptyForm() {
      this.form = {
        name: '',
        description: '',
        image_url: '',
        price: '',
        stock: '',
      };
    },
  },
};
</script>

<style scoped>

</style>
