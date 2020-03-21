<template>
    <div>
        <Navbar></Navbar>
        <div class="container">
            <div v-if="!editMode">
              <!-- <h1>{{id}}</h1> -->
              <h4>{{item.name}}</h4>
              <img v-bind:src="item.image_url" id="item-image">
              <p>{{item.description}}</p>
              <p>Price: {{item.price}}</p>
              <p>Stock: {{item.stock}}</p>
              <span
                v-if="specialRole"
                v-on:click="switchEditMode"
                class="btn btn-warning">
                Edit Information
              </span>
              <span
                v-if="specialRole"
                v-on:click="confirmDelete"
                class="btn btn-danger">
                Delete
              </span>
          </div>
          <div v-if="editMode">
              <h5 class="text-center">Edit Iten Form</h5>
              <form v-on:submit.prevent="editData" class="my-4">
                  <div class="form-group">
                      <label>Item Name:</label>
                      <input type="text"
                          class="form-control"
                          v-model="item.name">
                      </div>
                      <div class="form-group">
                          <label>Description:</label>
                          <textarea class="form-control"
                              v-model="item.description">
                          </textarea>
                      </div>
                      <div class="form-group">
                          <label>Image URL:</label>
                          <input type="text"
                              class="form-control"
                              v-model="item.image_url">
                      </div>
                      <div class="form-group">
                          <label>Price:</label>
                          <input type="number"
                              min="1" step="any"
                              class="form-control"
                              v-model="item.price">
                      </div>
                      <div class="form-group">
                          <label>Stock:</label>
                          <input type="number"
                              step="1" min="1" value="1"
                              v-model="item.stock"
                              class="form-control">
                      </div>
                  <input class="btn btn-success" type="submit">
              </form>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import appAxios from '../../config/appAxios';

export default {
  name: 'ItemDetail',
  components: {
    Navbar,
    Footer,
  },
  props: ['id'],
  data() {
    return {
      editMode: false,
      item: {
        name: '',
        description: '',
        image_url: '',
        price: '',
        stock: '',
      },
    };
  },
  created() {
    this.getOneItem(this.id);
  },
  methods: {
    getOneItem(id) {
      console.log(id);
      appAxios({
        method: 'GET',
        url: `/items/${id}`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          console.log('RESULT:', result.data);
          this.item = result.data;
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
    switchEditMode() {
      if (!this.editMode) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
      console.log(this.editMode);
    },
    editData() {
      console.log('Edit item:', this.id);
      appAxios({
        method: 'PUT',
        url: `/items/${this.id}`,
        data: this.item,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((result) => {
          this.editMode = false;
          this.$router.push(`/item/${result.id}`);
        })
        .catch((err) => {
          // console.log('Error:', err.response);
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.message || 'Something went wrong!',
          });
        });
    },
    confirmDelete() {
      this.$swal.fire({
        icon: 'warning',
        title: 'You sure you want to delete this entry?',
        text: 'This action cannot be reverted!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
      })
        .then((answer) => {
          console.log('Answer:', answer);
          if (answer.value) {
            appAxios({
              method: 'DELETE',
              url: `/items/${this.id}`,
              headers: {
                token: localStorage.getItem('token'),
              },
            })
              .then((result) => {
                console.log('Deleted this item:', result);
                this.$router.push('/');
                // this.$router.push(`/item/${result.id}`);
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
  },
  computed: {
    specialRole() {
      return this.$store.state.specialRole;
    },
  },
};
</script>

<style scoped>
#item-image{
  width:100%;
  max-width:400px;
  max-height:400px;
}
</style>
