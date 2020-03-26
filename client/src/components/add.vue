<template>
    <div class="container p-5 mt-5">
      <div id="addNewForm">
        <form @submit.prevent="addNewProduct">
          <h2 class="text-center">Add New Product</h2>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Product name"
              required="required"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Image Url"
              required="required"
              v-model="image_url"
            />
          </div>
          <div class="form-group">
            <input
              type="number"
              class="form-control"
              placeholder="Price"
              required="required"
              v-model="price"
            />
          </div>
          <div class="form-group">
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
              Add new product
            </button><br>
            <button type="button" class="btn btn-danger mt-1" @click.prevent="changeAddFalse">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name: ``,
            image_url:``,
            price: ``,
            stock: ``
        }
    },
    methods:{
        changeAddFalse() {
            this.$emit('doneAdd')
        },
        addNewProduct() {
            this.$store.dispatch('addNewProduct',{
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            })
            this.$emit('doneAdd')
        }
    }
}
</script>