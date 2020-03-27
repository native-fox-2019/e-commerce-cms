<template>
  <div>
    <v-btn
      bottom
      color="red"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="blue darken-3">
          Add Product
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field placeholder="Name" v-model="name" />
            </v-col>
             <v-col cols="12">
              <v-text-field placeholder="Image Url" v-model="image_url" />
            </v-col>
            <v-col cols="12">
              <v-select
                :items="items"
                :menu-props="{ offsetY: true }"
                label="Category"
                v-model="category"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Price" v-model="price" />
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Stock" v-model="stock" />
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="addProduct"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      dialog: false,
      items: ['Shirt', 'Hoodie', 'Shoes', 'Pants', 'Dress', 'Accessoris'],
      name: '',
      image_url: '',
      price: null,
      stock: null,
      category: null,
      base_url: 'https://guarded-thicket-66622.herokuapp.com',
    };
  },
  methods: {
    addProduct() {
      this.dialog = false;
      const input = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category,
      };
      // console.log(input);
      this.$store.commit('addProduct', input);
      // this.reset();
    },
    reset() {
      this.name = '';
      this.image_url = '';
      this.price = null;
      this.stock = null;
      this.category = null;
    },
  },
};
</script>
