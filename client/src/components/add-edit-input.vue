<template>
  <div class="input-container">
    <div class="input-container">
        <label for="name">NAME</label>
    </div>
    <div class="input-container">
        <input type="text" name="name" id="name-input" v-model="singledata.name">
    </div>
    <div class="input-container">
        <label for="name">PRICE</label>
    </div>
    <div class="input-container">
        <input type="number" name="price" id="price-input" v-model="singledata.price">
    </div>
    <div class="input-container">
        <label for="name">STOCKS</label>
    </div>
    <div class="input-container">
        <input type="number" name="stocks" id="stocks-input" v-model="singledata.stocks">
    </div>
    <div class="input-container">
        <label for="name">imageURL</label>
    </div>
    <div class="input-container">
        <input type="text" name="imageURL" id="imageURL-input" v-model="singledata.imageURL">
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-product',
  props: ['singledata']
}
</script>

<style>
.input-container {
    padding: 1vh;
}
</style>
