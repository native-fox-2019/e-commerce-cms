<template>
  <div class="addProductPage col-10">
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Product Name" v-model="name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Stock" type="Number" v-model="stock" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Url Image" v-model="urlImage" required></v-text-field>
              </v-col>              
              <v-col cols="12">
                <v-text-field label="Price" type="Number" v-model="price" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click.prevent="addProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "addProduct",
  data(){
    return {
      name: "",
      stock: 0,
      urlImage: '',
      price: 0,
    }
  },
  methods: {
    addProduct() {
      this.$axios({
        url: '/products',
        method: "POST",
        headers: {token: localStorage.getItem('token')},
        data: {
          name: this.name,
          stock: this.stock,
          urlImage: this.urlImage,
          price: this.price,  
        },
      })
      .then(data => {
        this.$store.dispatch("getAllData")
        this.$router.push({path: '/admins'})
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>