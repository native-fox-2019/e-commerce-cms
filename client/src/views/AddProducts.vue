<template>
  <div class="addProduct" :class="{ collapsed: isCollapsed }">
    <Navbar />
    <sidebar-menu @toggle-collapse="onToggleCollapse" :menu="menu" />
    <form @submit.prevent="onSubmit" >
      <label>Name</label>
      <input type="text" v-model="name">
      <label>Image Url</label>
      <input type="text" v-model="url">
      <label>Price</label>
      <input type="number" v-model="price">
      <label>Stock</label>
      <input type="number" v-model="stock">
      <button type="submit">Add</button>
    </form>
    <h3 v-if="isSuccess" >{{ onSuccess }}</h3>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
import { mapActions } from 'vuex';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'AddProducts',
  components: {
    SidebarMenu,
    Navbar,
  },
  created() {
    this.isSuccess = false;
  },
  data() {
    return {
      name: '',
      url: '',
      price: 0,
      stock: 0,
      isSuccess: false,
      onSuccess: 'Successfully Add a product',
      isCollapsed: false,
      menu: [
        {
          header: true,
          title: 'Main',
          hiddenOnCollapse: false,
        },
        {
          href: '/products',
          title: 'Dashboard',
          icon: 'fa fa-user',
        },
        {
          href: '/products',
          title: 'Actions',
          icon: 'fa fa-chart-area',
          child: [
            {
              href: '/products/add',
              title: 'Add Products',
            },
          ],
        },
      ],
    };
  },
  methods: {
    ...mapActions(['addProduct']),

    async onSubmit() {
      const newProduct = {
        name: this.name,
        image_url: this.url,
        price: this.price,
        stock: this.stock,
      };
      await this.addProduct(newProduct);
      this.isSuccess = true;
    },

    onToggleCollapse(collapsed) {
      if (collapsed) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    },
  },
};
</script>

<style scoped>
  * {
    margin-top: 10px;
  }

  .addProduct {
    padding-left: 350px;
    transition: all .3s ease;
  }

  .addProduct.collapsed {
    padding-left: 50px;
  }

  form {
    display:grid;
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
