<template>
<div class="itemContainer border">
  <div class="titleContainer">
  <span class="itemTitle"> {{this.data.name}}</span>
  </div>
  <div class="descriptionContainer" >
      <img :src="this.data.image_url" style="width:120px; height:170px;">
      <span> price : {{this.data.price}}</span>
      <span> stock : {{this.data.stock}} </span>
      <div class="edit">
        <button class="btn" ><i class="fa fa-bars"></i></button>
        <button class="btn"><i class="fa fa-trash"></i></button>
      </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['data'],

};
</script>

