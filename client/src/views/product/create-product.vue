<template>
    <div>
    <b-card>
    <b-form-group
      label-cols-lg="3"
      label="Create Product"
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label-cols-sm="3"
        label="Product Name:"
        label-align-sm="right"
        label-for="product-name"
      >
        <b-form-input id="product-name"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Product Price:"
        label-align-sm="right"
        label-for="product-price"
      >
        <b-form-input id="product-price"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Product Stock:"
        label-align-sm="right"
        label-for="product-stock"
      >
        <b-form-input id="product-stock" type="number"></b-form-input>
      </b-form-group>
    <b-button variant="success">Submit</b-button>
    </b-form-group>
  </b-card>
</div>
</template>
<script>
export default {
    
}
</script>