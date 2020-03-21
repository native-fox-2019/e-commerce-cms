<template>
  <div class="bigContainer boxCms">
    <div id="sideMenu">
      <!-- menu -->
      <div id="headMenu">
        <router-link to="/dashboard/all">
          <h3>WearIsysm</h3>
        </router-link>
      </div>
      <router-link to="/dashboard/baju" class="menu">
        <span>
          <img src="../assets/grid.svg" alt />
        </span>
        <span>Baju</span>
      </router-link>
      <router-link to="/dashboard/jaket" class="menu">
        <span>
          <img src="../assets/hexagon.svg" alt />
        </span>
        <span>Jaket</span>
      </router-link>
      <router-link to="/dashboard/celana" class="menu">
        <span>
          <img src="../assets/underline.svg" alt />
        </span>
        <span>Celana</span>
      </router-link>
      <router-link to="/dashboard/sepatu" class="menu">
        <span>
          <img src="../assets/pause.svg" alt />
        </span>
        <span>Sepatu</span>
      </router-link>
      <div class="menu" @click="actionAddProduct">
        <span>
          <img src="../assets/pause.svg" alt />
        </span>
        <span>Add Product</span>
      </div>

      <!-- end menu -->
    </div>

    <div id="contentCms">
      <div id="logoutIcon" @click="logOut">
        <img src="../assets/log-out.svg" alt />
      </div>
      <!--  -->
      <div
        id="containerContentCms"
        v-if="!this.$store.state.isAddProduct && !this.$store.state.isEditProduct"
      >
        <Product v-for="product in products" :key="product.id" :barang="product" />
      </div>
      <div
        class="containerContentCmsProduct"
        v-if="this.$store.state.isAddProduct && !this.$store.state.isEditProduct"
      >
        <AddProduct />
      </div>
      <div
        class="containerContentCmsProduct"
        v-if="!this.$store.state.isAddProduct && this.$store.state.isEditProduct"
      >
        <EditProduct />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/admin/Product.vue";
import AddProduct from "../components/admin/AddProduct.vue";
import EditProduct from "../components/admin/EditProduct.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // isAddProduct: false
      category: "all"
    };
  },
  components: {
    Product,
    AddProduct,
    EditProduct
  },

  created() {
    this.$store.dispatch("getAll");
  },
  mounted() {
    this.$store.dispatch("getAll");
    // this.$store.state.dataProducts;
    // console.log(this.$route, "<<<<<< route");
  },
  watch: {
    $route(to, from) {
      this.category = to.params.category;
    }
  },
  computed: {
    products() {
      let kategoryId = null;
      if (this.category == "baju") {
        kategoryId = 1;
      } else if (this.category == "jaket") {
        kategoryId = 2;
      } else if (this.category == "celana") {
        kategoryId = 3;
      } else if (this.category == "sepatu") {
        kategoryId = 4;
      }
      let arr = this.$store.state.dataProducts;
      if (this.category == "all") {
        return arr;
      } else {
        return arr.filter(item => {
          return item.CategoryId == kategoryId;
        });
      }
    }
  },
  methods: {
    actionAddProduct() {
      // this.$store.dispatch("addProduct");
      this.$store.commit("setIsAddProductTrue");
      this.$store.commit("setIsEditProductFalse");
    },

    logOut() {
      localStorage.clear();
      this.$store.commit("toIsLoginFalse");
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.lineBorder {
  border: 1px solid black;
}
.bigContainer {
  background-color: #fff;
  padding: 1em 2em;
  border-radius: 2em;
  /* height: 75vh; */
}
.boxCms {
  display: flex;
  flex-direction: row;
}
#sideMenu {
  width: 20%;
  height: 50vh;
  display: flex;
  flex-direction: column;
}
#contentCms {
  width: 80%;
  display: flex;
  flex-direction: column;
}
#headMenu {
  padding: 0.5em;
  /* height: 2em; */
}
#headMenu h3 {
  margin: 5px;
  letter-spacing: 2px;
}
#headMenu span {
  /* margin: 5px; */
  letter-spacing: 2px;
  margin: 5px;
}
#logoutIcon {
  width: 100%;
  height: 2em;
  padding: 0.5em;
  align-items: center;
  text-align: right;
  cursor: pointer;
}
#containerContentCms {
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  height: 1000px;
  width: 100%;
  justify-content: space-between;
  padding: 2em;
}
.containerContentCmsProduct {
  display: flex;
  flex-wrap: wrap;
  height: 1000px;
  width: 100%;
  justify-content: center;
  /* align-items: center; */
}
.menu {
  display: flex;
  align-items: center;
  padding: 5px 0.5em;
}
.menu:hover {
  cursor: pointer;
  padding: 5px 0.5em;
  background-color: #e84393;
  color: #fff;
}
.menu img:hover {
  stroke: #fff;
}
.menu span {
  text-align: left;
  display: flex;
  margin: 5px 5px;
  font-size: 1em;
  letter-spacing: 2px;
  font-weight: normal;
}
.menu img {
  margin-right: 1em;
}
</style>