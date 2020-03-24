<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing>Add Product</b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add New Product"
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
        <!--  -->
        <b-form-group
          :state="nameState"
          label="Image Url"
          label-for="image_url-input"
          invalid-feedback="Image url is required"
        >
          <b-form-input id="image_url-input" v-model="image_url_modal" :state="nameState" required></b-form-input>
        </b-form-group>
        <!--  -->
        <b-form-group
          :state="nameState"
          label="Price"
          label-for="price-input"
          invalid-feedback="Price is required"
        >
          <b-form-input id="price-input" v-model="price_modal" :state="nameState" type:integer required></b-form-input>
        </b-form-group>
        <!--  -->
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
    <hr class="mb-0">
  </div>
</template>

<script>
// let url = `https://powerful-meadow-02119.herokuapp.com`;
let url = `http://localhost:3000`
import axios from "axios";
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      // test : 'haha',
      name: "",
      nameState: null,
      submittedNames: [],
      name_modal: null,
      image_url_modal: null,
      price_modal: null,
      stock_modal: null
    };
  },
  methods: {
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
      this.addForm(this.name_modal, this.image_url_modal, this.price_modal, this.stock_modal);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    addForm(name, image_url, price, stock) {
      axios({
        method: 'post',
        url: `${url}/products/`,
        headers: {
          access_token: localStorage.getItem("token")
        },
        data: {
          name : name,
          image_url: image_url,
          price : price,
          stock : stock
        }
      })
        .then(() => {
          Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${name} has been saved`,
          showConfirmButton: false,
          timer: 1200
        })
          this.name_modal = null,
          this.image_url_modal = null,
          this.price_modal = null,
          this.stock_modal = null
          this.$store.dispatch('getProduct')
        })
        .catch(err => {
          if(err.response.status === 400){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Price and Stock must be a number'
            })
          } else {
            console.log(err.response)
          }
        });
    }
  }
};
</script>