<template>
<div>
<div>
    <div class="view d-flex row justify-content-center"
      v-if="view">
          <div
          class="card col-2 ml-3 mb-3"
          style="width: 18rem;"
          v-for="data in this.$store.state.productList"
          :key="data.id"
          >
              <img class="card-img-top" :src="data.image_url" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">{{ data.name }}</h5>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Price : Rp.{{ data.price.toLocaleString('ID') }}</li>
                  <li class="list-group-item">Stock : {{ data.stock }}</li>
              </ul>
              <div class="card-body d-flex justify-content-between row">
                  <input type="button" class="btn btn-info ml-3" value="Edit"
                  v-on:click.prevent="edit(data.id)">
                  <input type="button" class="btn btn-danger ml-3"
                  v-on:click.prevent="deleteProduct(data.id)" value="Delete">
              </div>
          </div>
      </div>
      <EditProduct :elementEdit="elementEdit" v-if="editBox"></EditProduct>
  </div>
</div>
</template>
<script>
import EditProduct from '../components/EditProduct.vue';

export default {
  name: 'ViewProduct',
  components: {
    EditProduct,
  },
  data() {
    return {
      elementEdit: '',
      editBox: false,
      view: true,
    };
  },
  created() {
    this.viewProducts();
  },
  methods: {
    viewProducts() {
      this.$store.dispatch('getProducts');
    },
    edit(id) {
      this.$store.state.productList.forEach((element) => {
        if (element.id === id) {
          this.elementEdit = element;
        }
      });
      this.editBox = true;
      this.view = false;
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id);
    },
  },
};
</script>
<style scoped>
.view {
    width: 100%;
    padding-top: 20px;
}

</style>
