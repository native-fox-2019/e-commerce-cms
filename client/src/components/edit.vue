<template>
  <div class="container">
    <h2 class="text-center mb-3">Edit Product</h2>
    <img
      class="card-img-top"
      :src="image_url"
      alt="Card image cap"
      style="width:40%; height:350px;"
    />
    <div id="editForm">
      <form @submit.prevent="editProduct">
        <div class="form-group">
          <strong>Name</strong>
          <input
            type="text"
            class="form-control"
            placeholder="Product name"
            required="required"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <strong>Image Url</strong>
          <input
            type="text"
            class="form-control"
            placeholder="Image Url"
            required="required"
            v-model="image_url"
          />
        </div>
        <div class="form-group">
          <strong>Price</strong>
          <input
            type="text"
            class="form-control"
            placeholder="Price"
            required="required"
            v-model="price"
          />
        </div>
        <div class="form-group">
          <strong>Stock</strong>
          <input
            type="number"
            class="form-control"
            placeholder="Stock"
            required="required"
            v-model="stock"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">
            Submit changes</button
          ><br />
          <button
            type="button"
            class="btn btn-danger mt-1"
            @click.prevent="changeEditFalse"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["edit_prod"],
  data() {
    return {
      name: ``,
      image_url: ``,
      price: ``,
      stock: ``
    };
  },
  created() {
    this.name = this.edit_prod.name;
    this.image_url = this.edit_prod.image_url;
    this.price = this.edit_prod.price;
    this.stock = this.edit_prod.stock;
  },
  methods: {
    changeEditFalse() {
      this.$emit("notEdit");
    },
    editProduct() {
        this.$store.dispatch('editProduct', {
            id: this.edit_prod.id,
            name: this.name,
            image_url: this.image_url,
            price: this.price,
            stock: this.stock
        })
        this.$emit('doneEditing')
    }
  }
};
</script>
