<template>
  <div class="col-10">
    <b-card>
      <b-card-header class="row">
        <div class="col-11"><h3>Product List</h3></div>
        <div class="col-1">
          <b-button variant="success" v-b-modal.modal-product-add>
            Add
          </b-button>
        </div>
      </b-card-header>
      <b-card-body>
        <table class="table">
          <thead class="thead-primary">
            <tr class="text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Description</th>
              <th scope="col">CategoryId</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="product in products" :key="product.id">
            <tr class="text-center">
              <th scope="row">{{ product.id }}</th>
              <td>{{ product.name }}</td>
              <td>{{ product.image_url }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.CategoryId }}</td>
              <td class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mx-2"
                  v-b-modal.modal-product-edit
                  @click.prevent="editProduct(product)"
                >
                  Edit
                </b-button>
                <b-button
                  variant="danger"
                  class="mx-2"
                  @click.prevent="deleteUser(product.id)"
                >
                  Delete
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>
    <!-- MODAL ADD USER -->
    <AddProduct></AddProduct>
    <!-- MODAL EDIT USER -->
    <b-modal
      id="modal-product-edit"
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
          <b-form-input
            id="name-input"
            v-model="form.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import AddProduct from "./products/AddProduct";
export default {
  name: "Product",
  data() {
    return {
      form: {
        name: "",
        image_url: "",
        price: "",
        stock: "",
        description: "",
        CategoryId: ""
      },
      nameState: null,
      image_urlState: null,
      priceState: null,
      stockState: null,
      descriptionState: null,
      CategoryIdState: null
    };
  },
  components: {
    AddProduct
  },
  computed: {
    products: function() {
      return this.$store.state.products;
    }
  },
  created() {
    this.$store.dispatch("getProducts");
  },
  methods: {
    deleteUser(id) {
      this.$swal
        .fire({
          title: "Are you sure delete this product?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.$axios({
              method: "delete",
              url: "/products/" + id,
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                this.$store.dispatch("getProducts");
                console.log(data);
                this.$swal.fire({
                  position: "top",
                  icon: "success",
                  html: data,
                  showConfirmButton: false,
                  timer: 1500
                });
              })
              .catch(({ response }) => {
                console.log(response.data);
                this.$swal.fire({
                  position: "top",
                  icon: "error",
                  title: response.data.status,
                  html: response.data.message,
                  showConfirmButton: true
                  // timer: 1500
                });
              });
          }
        });
    },
    editProduct(product) {
      // console.log(product)
      this.form = product;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      // this.form = {};
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      // this.submittedNames.push(this.name);
      // console.log(this.form.id);
      this.$axios({
        method: "put",
        url: "/products/" + this.form.id,
        headers: {
          token: localStorage.getItem("token")
        },
        data: this.form
      })
        .then(({ data }) => {
          this.$store.dispatch("getProducts");
          console.log(data);
          this.$swal.fire({
            position: "top",
            icon: "success",
            title: "succes update product",
            html: data.name,
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(({ response }) => {
          // console.log(response)
          console.log(response.data);
          this.$swal.fire({
            position: "top",
            icon: "error",
            title: response.data.status,
            html: response.data.message,
            showConfirmButton: true
            // timer: 1500
          });
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-product-edit");
      });
    }
  }
};
</script>

<style scoped></style>
