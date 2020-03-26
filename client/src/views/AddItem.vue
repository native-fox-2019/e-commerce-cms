<template>
    <div>
        <Navbar></Navbar>
            <div class="container p-4">
                <h5 class="text-center">Add New Item</h5>
                <form v-on:submit.prevent="submitForm" class="my-4" enctype="multipart/form-data">
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
                        <label>Image (URL Link):</label>
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
import appAxios from '../config/appAxios';

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
      imageFile: null,
    };
  },
  methods: {
    onSelectFile() {
      this.$refs.fileInput.click();
    },
    onPickedFile(event) {
      const [files] = event.target.files;
      const filename = files.name;
      this.form.image_url = files;
      console.log('File name:', filename);
      if (filename.lastIndexOf('.') <= 0) {
        console.log('Please add a valid file!');
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageFile = fileReader.result;
        });
        fileReader.readAsDataURL(files);
      }
      // [this.form.image_url] = this.$refs.fileInput.files;
      // console.log('File changed!', this.$refs.image);
      // console.log(this.form.image_url);
      // console.log(this.form);
    },
    submitForm() {
      // <v-flex xs12 sm6 offset-sm3>
      //                   <img :src="imageFile" height="150">
      //               </v-flex>
      //               <div class="form-group">
      //                   <label>Image URL (File):</label><br>
      //                   <v-btn @click="onSelectFile" raised class="primary">Upload Image</v-btn>
      //                   <input type="file"
      //                       ref="fileInput"
      //                       style="display:none"
      //                       @change="onPickedFile"
      //                       accept="image/*">
      //               </div>
      // [this.form.image_url] = this.$refs.fileInput.files;
      console.log('Form:', this.form);
      // const formData = new FormData();
      // formData.append('name', this.form.name);
      // formData.append('description', this.form.description);
      // formData.append('image_url', this.form.image_url);
      // formData.append('price', this.form.price);
      // formData.append('stock', this.form.stock);
      // console.log('formData is now:', formData);
      // appAxios({
      //   method: 'POST',
      //   url: '/items',
      //   data: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     token: localStorage.getItem('token'),
      //   },
      // })
      //   .then((result) => {
      //     console.log('Added this item:', result);
      //     this.emptyForm();
      //     this.$router.push('/');
      //     // this.$router.push(`/item/${result.id}`);
      //   })
      //   .catch((err) => {
      //     console.log('Error:', err.response);
      //     this.$swal.fire({
      //       icon: 'error',
      //       title: 'Oops...',
      //       text: err.response.data.message,
      //     });
      //   });

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
