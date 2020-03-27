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
        <b-form-input id="product-name" v-model="product.name"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Product Price:"
        label-align-sm="right"
        label-for="product-price"
      >
        <b-form-input id="product-price" v-model="product.price"></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Product Stock:"
        label-align-sm="right"
        label-for="product-stock"
      >
        <b-form-input id="product-stock" v-model="product.stock" type="number"></b-form-input>
      </b-form-group>
       <b-form-group
        label-cols-sm="3"
        label="Product Category:"
        label-align-sm="right"
        label-for="product-category"
      >
          <b-form-select
            v-model="product.category"
            :options="categories"
            class="mb-3"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
          ></b-form-select>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Product Image:"
        label-align-sm="right"
        label-for="product-image"
      >
          <b-form-file
          v-model="product.image"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
       <b-form-group
        label-cols-sm="3"
        label="Product Description:"
        label-align-sm="right"
        label-for="product-description"
      >
          <b-form-textarea
            id="product-description"
            v-model="product.description"
            rows="3"
            no-resize></b-form-textarea>
      </b-form-group>
    <b-button variant="success" @click="onSubmit" :disabled="isSubmitting">Submit</b-button>
    </b-form-group>
  </b-card>
</div>
</template>
<script>
export default {
    data(){
        return {
            product:{
                name:'',
                price:0,
                stock:0,
                category:null,
                description:''
            },
            isSubmitting:false,
            categories:this.$store.state.categories
        }
    },
    methods:{
      onSubmit(){
        // this.$store.commit('addProduct',this.product);
        var self=this;
        console.log(self.product);
        this.$store.dispatch('addProduct',this.product)
        .then(()=>{
          self.$router.push('/product');
        })
        .finally(()=>{
          this.isSubmitting=false;
        })
        this.isSubmitting=true;
      }
    }
}
</script>