<template>
  <div class="addProductPage col-10">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Product Name" v-model="name"  required></v-text-field>
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
          <v-btn color="blue darken-1" text @click.prevent="toHome">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click.prevent="editProduct">Edit</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "editProductPage",
  data() {
    return{
      // getOne: {},
      name: '',
      stock: '',
      urlImage: '',
      price: '',
      // data: this.$store.state.oneProduct,
    }
  },
  created() {
    this.getOne()
  },
  methods: {
    getOne() {
      this.$axios({
        method: 'GET',
        url: `/products/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.name= data.name,
          this.stock= data.stock,
          this.urlImage= data.urlImage,
          this.price= data.price
        })
        .catch(({ response }) => {
          console.log(response);
        })
    },
    toHome() {
      this.name = '',
      this.stock = '',
      this.urlImage = '',
      this.price = ''
      this.$router.push({path: '/admins'})
    },
    editProduct() {
      this.$axios({
        url: `/products/${this.$route.params.id}`,
        method: "PATCH",
        headers: {token: localStorage.getItem("token")},
        data: {
          name: this.name,
          stock: this.stock,
          urlImage: this.urlImage,
          price: this.price,
        }
      })
      .then(data => {
        this.name = '', 
        this.stock = '', 
        this.urlImage = '', 
        this.price = '', 
        this.$router.push({path: '/admins'})
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style>

</style>