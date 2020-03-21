<template>
  <form>
    <div class="form-group">
      <label for="">Name</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="">Image URL</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="">Price</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="">Stock</label>
      <input type="text" class="form-control">
    </div>
    <div class="form-group">
      <select class="custom-select">
        <option selected disabled>Select category</option>
        <option>T-Shirt</option>
        <option>Hoodie</option>
        <option>Shoes</option>
        <option>Hat</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'AddProduct',
};
</script>
