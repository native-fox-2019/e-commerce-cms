<template>
  <div class="card">
    <img :src="product.image_url" style="width: 100%; heigth: auto; margin-bottom: 15px">
    <div class="card-name">
      <span>{{ product.name }}</span>
    </div>
    <div class="card-price">
      <span>Rp{{ product.price }}</span>
    </div>
    <div class="card-action" v-if="isLogin">
      <div class="btn-edit">
        <i class="fa fa-edit"></i>
      </div>
      <div class="btn-delete">
        <i class="fa fa-trash"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['product', 'isLogin'],
};
</script>
