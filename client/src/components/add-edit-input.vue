<template>
  <div class="form-container">
    <div>
        <label for="name">NAME</label>
    </div>
    <div>
        <input type="text" name="name" id="name-input" v-model="singledata.name">
    </div>
    <div>
        <label for="name">PRICE</label>
    </div>
    <div>
        <input type="number" name="price" id="price-input" v-model="singledata.price">
    </div>
    <div>
        <label for="name">STOCKS</label>
    </div>
    <div>
        <input type="number" name="stocks" id="stocks-input" v-model="singledata.stocks">
    </div>
    <div>
        <label for="name">imageURL</label>
    </div>
    <div>
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

</style>
