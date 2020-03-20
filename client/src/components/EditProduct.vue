<template>
  <div class="edit">
    <h3> Edit Product </h3>
            <form id="form-add" action="" method="POST">
                <label for="fname">Name:</label><br>
                <input type="text" id="Name" name="Name" value="" v-model="name" required><br>
                <label for="fname">Image Url:</label><br>
                <input
                type="text" id="email" name="image_url" value="" v-model="image_url" required
                ><br>
                <label for="lname">Price:</label><br>
                <input type="text" name="price" value="" v-model="price" required><br><br>
                <label for="lname">Stock:</label><br>
                <input type="text" name="stock" value="" v-model="stock" required><br><br>
                <input
                type="submit" class="btn btn-dark" value="Edit Product" v-on:click.prevent="edit"
                >
            </form>
  </div>
</template>
<script>
export default {
  name: 'EditProduct',
  props: ['elementEdit'],
  data() {
    return {
      name: '',
      image_url: '',
      price: '',
      stock: '',
    };
  },
  created() {
    console.log(this.elementEdit);
    this.name = this.elementEdit.name;
    this.image_url = this.elementEdit.image_url;
    this.price = this.elementEdit.price;
    this.stock = this.elementEdit.stock;
  },
  methods: {
    edit() {
      this.$store.dispatch('edit', {
        id: this.elementEdit.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      });
    },
  },
};
</script>
