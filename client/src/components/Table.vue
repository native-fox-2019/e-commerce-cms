<template>
<div>
<AddData></AddData>
<div class="container title">
  <h1>Data Product</h1>
</div>
<div class="add my-0">
 <b-button v-b-modal.modal-prevent-closing><i class="fas fa-plus"></i></b-button>
</div>
  <table class="table table-bordered mt-3">
  <thead class="atas">
    <tr >
      <th style="width:5%; font-size:25px; font-weight:700" scope="col">No</th>
      <th style="width:15%; font-size:25px; font-weight:700" scope="col">Name</th>
      <th style="width:10%; font-size:25px; font-weight:700" scope="col">Category</th>
      <th style="width:20; font-size:25px; font-weight:700" scope="col">Desciption</th>
      <th style="width:10%; font-size:25px; font-weight:700" scope="col">Price(M)</th>
      <th style="width:10%; font-size:25px; font-weight:700" scope="col">stock</th>
      <th style="width:20%; font-size:25px; font-weight:700" scope="col">Image</th>
      <th style="width:5%; font-size:25px; font-weight:700" scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(product,i) in products" :key="product.id">
      <td style="font-size:20px">{{i + 1}}</td>
      <td style="font-size:20px">{{product.name}}</td>
      <td style="font-size:20px">{{product.category}}</td>
      <td style="font-size:20px">{{product.description}}</td>
      <td style="font-size:20px">{{product.price}}</td>
      <td style="font-size:20px">{{product.stock}}</td>
      <td><img :src="product.image_url" alt="airbus" style="width:100%; border-radius:20px;"></td>
      <td> 
      <button type="button" class="btn btn-success" @click="editForm(product)"><i class="far fa-edit"></i></button>
      <button type="button" class="btn btn-danger" @click="deleteData(product.id)"><i class="fas fa-trash-alt"></i></button>
        </td>
    </tr>

  </tbody>
</table>
</div>
</template>

<script>
import Vue from 'vue'
import AddData from '../components/AddData'
export default Vue.extend({
  name : 'Table',
  components : {
    AddData
  },
  computed : {
    products() {
    let arr =  this.$store.state.products
    return arr
    }
  },
  mounted(){
    this.$store.dispatch('findAll')
  },
  methods : {
    deleteData(id) {
    this.$store.dispatch('actionDelete',id)
  },
  editForm(data) {
    this.$store.commit('editForm',data)
    this.$router.push({path : `/edit/${data.id}`})
  }
  }
})
</script>

<style>
.title {
  margin-top: 3rem;
}
</style>