<template>
  <div class="edit-product" :class="{ collapsed: isCollapsed }">
    <Navbar />
    <Sidebar @collapsed="onToggleCollapse" />
    <form @submit.prevent="onSubmit" >
      <label>Name</label>
      <input type="text" v-model="name">
      <label>Image Url</label>
      <input type="text" v-model="url">
      <label>Category</label>
      <input type="text" v-model="category">
      <label>Price</label>
      <input type="number" v-model="price">
      <label>Stock</label>
      <input type="number" v-model="stock">
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';

export default {
  name: 'EditProduct',
  props: ['product', 'id'],
  components: {
    Navbar,
    Sidebar,
  },
  created() {
    if (!this.product) {
      this.$router.push({ path: '/products' });
    }
  },
  data() {
    if (!this.product) {
      return {
        name: '',
        url: '',
        stock: '',
        price: '',
        category: '',
      };
    }
    return {
      name: this.product.name,
      url: this.product.image_url,
      price: this.product.price,
      stock: this.product.stock,
      category: this.product.category,
      isCollapsed: false,
    };
  },
  methods: {
    ...mapActions(['editProduct']),
    onToggleCollapse(collapsed) {
      if (collapsed) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    },

    async onSubmit() {
      const edited = {
        id: this.product.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category,
      };
      await this.editProduct(edited);
      this.$router.push({ path: '/products' });
    },
  },
};
</script>

<style scoped>
.edit-product {
    padding-left: 350px;
    transition: all .3s ease;
  }

  .edit-product.collapsed {
    padding-left: 50px;
  }

  form {
    display:grid;
    margin-top: 10px;
  }

  label {
    margin: 0px 30px;
  }

  input {
    height: 20px;
    width: 200px;
    margin: 10px auto;
    text-align: center;
  }

  button {
    height: 30px;
    width: 100px;
    margin: 10px auto;
    border-radius: 20px;
    border-color: salmon;
    cursor: pointer;
  }
</style>
