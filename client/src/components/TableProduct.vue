<template>
  <div>
    <b-modal
        id="modal-prevent"
        ref="modal"
        title="Edit Product"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Name"
            label-for="name-input"
            invalid-feedback="Name is required"
          >
            <b-form-input id="name-input" v-model="name_modal" :state="nameState" required></b-form-input>
          </b-form-group>
          
          <b-form-group
            :state="nameState"
            label="Image Url"
            label-for="image_url-input"
            invalid-feedback="Image url is required"
          >
            <b-form-input id="image_url-input" v-model="image_url_modal" :state="nameState" required></b-form-input>
          </b-form-group>
          
          <b-form-group
            :state="nameState"
            label="Price"
            label-for="price-input"
            invalid-feedback="Price is required"
          >
            <b-form-input id="price-input" v-model="price_modal" :state="nameState" required></b-form-input>
          </b-form-group>
          
          <b-form-group
            :state="nameState"
            label="Stock"
            label-for="stock-input"
            invalid-feedback="Stock is required"
          >
            <b-form-input id="stock-input" v-model="stock_modal" :state="nameState" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal> 
    <div style="height : 620px; overflow: auto">
      <table class="table table-striped border" border="1">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <th scope="row">{{index += 1}}</th>
            <td>{{product.name}}</td>
            <td><img :src="product.image_url" style="width : 25%"></td>
            <td>Rp.{{product.price.toLocaleString()}}</td>
            <td>{{product.stock}}</td>
            <td><b-button v-b-modal.modal-prevent @click.prevent="editItem(product.id)">Edit</b-button></td>
            <td><button @click.prevent="deleteItem(product.id)" class="btn btn-danger">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>    
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  components : {
  },
  computed: mapState(['products', 'url']),
  data (){
    return {
      nameState: null,
      name_modal : null,
      image_url_modal : null,
      price_modal : null,
      stock_modal : null,
      id : null
    }
  },
  created (){
    this.$store.dispatch('getProduct')
  },
  methods : {
    deleteItem(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          return axios({
            method : 'delete',
            url : `${this.url}/products/${id}`,
            headers: {
            access_token: localStorage.getItem("token")
            },
          })
          .then(()=>{
            Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
            )
            this.$store.dispatch('getProduct')
          })
        }
      })
      .catch(err =>{
        console.log(err)
      })
    },
    editItem(id){
      axios({
        method : 'get',
        url : `${this.url}/products/${id}`,
        headers: {
          access_token: localStorage.getItem("token")
        },
      })
      .then(res => {
        this.name_modal = res.data.data.name,
        this.image_url_modal = res.data.data.image_url,
        this.price_modal = res.data.data.price,
        this.stock_modal = res.data.data.stock
        this.id = res.data.data.id
      })
      .catch(err =>{
        console.log(err)
      })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name_modal = "";
      this.image_url_modal = "";
      this.price_modal = "";
      this.stock_modal = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.editList(this.id, this.name_modal, this.image_url_modal, this.price_modal, this.stock_modal);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent");
      });
    },
    editList(id, name, image_url, price, stock){
      axios({
        method : 'put',
        url : `${this.url}/products/${id}`,
        headers: {
            access_token: localStorage.getItem("token")
        },
        data: {
          name : name,
          image_url : image_url,
          price : price,
          stock : stock
        }
      })
      .then(()=>{
        this.$store.dispatch('getProduct')
      })
      .catch(err =>{
        console.log(err.response)
      })
    }
  },
  watch : {
  }
}
</script>
