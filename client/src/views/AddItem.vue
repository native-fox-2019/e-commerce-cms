<template>
    <div>
        <Navbar></Navbar>
            <div class="container"
            style="display:flex; justify-content:center; align-items: center; min-height: 100vh;">
              <div id="add-box">
                <h5 class="text-center">Add New Item</h5>
                <form v-on:submit.prevent="submitForm" class="my-4" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text"
                            class="form-control"
                            placeholder="insert the name here"
                            v-model="form.name">
                    </div>
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea class="form-control"
                            v-model="form.description"
                            placeholder="insert item description here">
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label>Image (URL Link):</label>
                        <input type="text"
                            class="form-control"
                            v-model="form.image_url"
                            placeholder="insert image link here">
                    </div>
                    <div class="form-group">
                        <label>Price:</label>
                        <input type="number"
                            min="0" step="1000"
                            class="form-control"
                            v-model="form.price"
                            placeholder="currency in Rupiah">
                    </div>
                    <div class="form-group">
                        <label>Stock:</label>
                        <input type="number"
                            step="1" min="1" value="1"
                            v-model="form.stock"
                            placeholder="1"
                            class="form-control">
                    </div>
                    <input class="btn btn-success" type="submit" value="Add Item">
                </form>
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
h1 {
  font-size: 2em;
  color: white;
  padding-bottom: 1em;
}

#add-box {
  color: white;
  margin: 4em 0em;
  width: 30em;
  background: #41af6b;
  padding: 2em 3em;
  border-radius: 0.5em;
}
</style>
