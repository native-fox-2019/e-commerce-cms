<template>
  <div class="bigContainer boxCms">
    <div id="sideMenu">
      <!-- menu -->
      <div id="headMenu">
        <h3>WearIsysm</h3>
      </div>
      <div class="menu">
        <span>
          <img src="../assets/grid.svg" alt />
        </span>
        <span>Baju</span>
      </div>
      <div class="menu">
        <span>
          <img src="../assets/hexagon.svg" alt />
        </span>
        <span>Jaket</span>
      </div>
      <div class="menu">
        <span>
          <img src="../assets/underline.svg" alt />
        </span>
        <span>Celana</span>
      </div>
      <div class="menu">
        <span>
          <img src="../assets/pause.svg" alt />
        </span>
        <span>Sepatu</span>
      </div>
      <div class="menu">
        <span>
          <img src="../assets/pause.svg" alt />
        </span>
        <span>Add Product</span>
      </div>

      <!-- end menu -->
    </div>

    <div id="contentCms">
      <div id="logoutIcon">
        <img src="../assets/log-out.svg" alt />
      </div>
      <!--  -->
      <div id="containerContentCms">
        <Product v-for="product in products" :key="product.id" :barang="product" />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "../components/admin/Product.vue";
export default {
  components: {
    Product
  },
  mounted() {
    this.$store.dispatch("getAll");
    this.$store.state.dataProducts;
  },
  computed: {
    products() {
      let arr = this.$store.state.dataProducts;
      return arr;
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