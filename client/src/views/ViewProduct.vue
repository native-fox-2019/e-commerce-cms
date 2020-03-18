<template>
<div>
    <div class="view d-flex row justify-content-center"
    v-if="view">
        <div
        class="card col-3 ml-3 mb-3"
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
            <div class="card-body">
                <input type="button" class="btn btn-warning ml-3" value="Edit Product"
                v-on:click.prevent="edit(data.id)">
                <input type="button" class="btn btn-danger ml-3" value="Delete Product">
            </div>
        </div>
    </div>
    <EditProduct :elementEdit="elementEdit" @editButton="editButton" v-if="editBox"></EditProduct>
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
    editButton() {
      this.editBox = false;
      this.view = true;
    },
  },
};
</script>
<style scoped>
.flex-row {
    margin-left: 10px;
}

</style>
