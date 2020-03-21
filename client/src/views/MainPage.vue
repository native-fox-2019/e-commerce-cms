<template>
    <div>
        <Navbar></Navbar>
        <!-- Modal Edit -->
        <b-modal
        id="modal-edit"
        ref="modal"
        title="Add new stock"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        >
        <form ref="form" @submit.stop.prevent="createData">
          <b-form-group
          :state="addState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          >
              <b-form-input
                  id="name-input"
                  v-model="nameEdit"
                  :state="addState"
                  required
              ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="addState"
          label="Image url"
          label-for="image-input"
          invalid-feedback="Image is required"
          >
              <b-form-input
                  id="image-input"
                  v-model="imageEdit"
                  :state="addState"
                  required
              ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="addState"
          label="Price"
          label-for="price-input"
          invalid-feedback="Price is required"
          >
              <b-form-input
                  id="price-input"
                  v-model="priceEdit"
                  :state="addState"
                  required
              ></b-form-input>
          </b-form-group>

          <b-form-group
          :state="addState"
          label="Stock"
          label-for="stock-input"
          invalid-feedback="Stock is required"
          >
              <b-form-input
                  id="stock-input"
                  v-model="stockEdit"
                  :state="addState"
                  required
              ></b-form-input>
          </b-form-group>
        </form>
    </b-modal>

        <img style="width: 15%;" alt="logo" src="../assets/guitar.png">
        <h1>
            Oldie Music Admin Page
        </h1>

        <ModalAdd></ModalAdd>
        <ModalRegister></ModalRegister>

        <div>
          <button v-b-modal.modal-register class="btn btn-primary" style="margin-right: 1%;">Create New Admin</button>
          <button v-b-modal.modal-add class="btn btn-success" style="margin-left: 1%;">Add new stock</button>
        </div>

        <h1>Curent Stock</h1>
        <div class="container">
          <table class="table" border="1">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
            <tr v-for="product in allProducts" :key="product.index">
                <td>{{product.name}}</td>
                <td><img style="width: 35%;" alt="product image" :src="product.image_url"></td>
                <td>Rp.{{product.price.toLocaleString()}}</td>
                <td>{{product.stock}}</td>
                <td>
                  <button v-b-modal.modal-edit @click="showEditData(product.id)" class="btn btn-info m-3">Update</button>
                  <button @click="deleteData(product.id)" class="btn btn-danger">Delete</button>
               </td>
            </tr>
          </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import {mapState} from 'vuex';
import Navbar from '../components/Navbar.vue';
import ModalAdd from '../components/modalAdd.vue';
import ModalRegister from '../components/modalRegister.vue';

export default {
  name: 'MainPage',
  components: {
    Navbar,
    ModalAdd,
    ModalRegister
  },
  computed: mapState(['allProducts']),
  data () {
    return {
        products : [],
        endpoint : 'http://localhost:3000',
        nameEdit : null,
        imageEdit : null,
        priceEdit : null,
        stockEdit : null,
        idEdit: null,
        addState : null
    }
  },
  created(){
      this.$store.dispatch('getData')
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.addState = valid
      return valid
    },

    resetModal() {
      this.nameEdit = '';
      this.imageEdit = '';
      this.priceEdit = '';
      this.stockEdit = '';
      this.addState = null;
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
  
      this.editData()
    },

    editData(){
      axios({
        method: 'put',
        url: `${this.endpoint}/products/${this.idEdit}`,
        headers: {token: localStorage.getItem('token')},
        data: {
          name: this.nameEdit,
          image_url: this.imageEdit,
          price: this.priceEdit,
          stock: this.stockEdit
        }
      })
        .then(()=>{
          this.$store.dispatch('getData')
        })
        .catch(err=>{
          console.log(err)
        })

      this.$nextTick(() => {
        this.$bvModal.hide('modal-edit')
      })
    },

    deleteData(id){
      axios({
        method: 'delete',
        url: `${this.endpoint}/products/${id}`,
        headers: {token: localStorage.getItem('token')}
      })
        .then(()=>{
          this.$store.dispatch('getData');
        })
        .catch(err=>{
          console.log(err)
        })
    },

    showEditData(id){
      axios({
        method: 'get',
        url: `${this.endpoint}/products/${id}`,
        headers: {token: localStorage.getItem('token')}
      })
        .then(res=>{
          this.idEdit = res.data.id;
          this.nameEdit = res.data.name;
          this.imageEdit = res.data.image_url;
          this.priceEdit = res.data.price;
          this.stockEdit = res.data.stock;
        })
        .catch(err=>{
          console.log(err)
        })
    }
  }
}
</script>
