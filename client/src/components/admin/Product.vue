<template>
  <div>
    <!-- items barang card -->

    <div class="card" style="width:15rem">
      <img :src="barang.image_url" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{barang.name}}</h5>
        <p class="card-text">Price : {{price(barang.price)}}</p>
        <p class="card-text">Stock : {{barang.stock}}</p>
        <p class="card-text">category : {{barang.Category.name}}</p>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary" @click="actionEdit(barang)">
            <input type="radio" name="options" data-toggle="modal" />
            <i class="far fa-edit"></i>
          </label>
          <label class="btn btn-secondary" @click="actionDelete(barang.id)">
            <input type="radio" name="options" />
            <i class="fas fa-eraser"></i>
          </label>
        </div>
      </div>
    </div>
    <!-- end items barang card -->
  </div>
</template>

<script>
import idr from "../helper/idr";
export default {
  name: "Product",
  props: ["barang"],
  methods: {
    price(value) {
      return idr(value);
    },
    actionDelete(id) {
      this.$store.dispatch("deleteProduct", id);
    },
    actionEdit(barang) {
      // this.$store.dispatch("getOneProduct", barang);
      this.$store.commit("setIsEditProductTrue");
      this.$store.commit("dataEditfromActions", barang);
    }
  }
};
</script>

<style>
/* card */
.card {
  display: flex;
  margin: 1em;
  height: 350px;
}
.card-title,
.card-text {
  margin: 1px;
}
.card-text {
  font-size: 1em;
}
.categoryBtn {
  cursor: pointer;
}
.categoryBtn:hover {
  border-bottom: 2px solid white;
}
.card-img-top {
  border-bottom: 2px solid #e84393;
}
.card-body {
  color: #000;
}
.card-img,
.card-img-bottom,
.card-img-top {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 10em;
  object-fit: cover;
}
</style>