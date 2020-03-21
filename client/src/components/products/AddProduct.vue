<template>
  <div>
    <b-modal
      id="modal-product-add"
      ref="modal"
      title="Add Product"
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
        <b-form-group
          :state="image_urlState"
          label="Image_URL"
          label-for="image_url-input"
          invalid-feedback="Image_URL is required"
        >
          <b-form-input
            id="image_url-input"
            v-model="form.image_url"
            :state="image_urlState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="priceState"
          label="Price"
          label-for="price-input"
          invalid-feedback="Price is required"
        >
          <b-form-input
            id="price-input"
            v-model="form.price"
            :state="priceState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="stockState"
          label="Stock"
          label-for="stock-input"
          invalid-feedback="Stock is required"
        >
          <b-form-input
            id="stock-input"
            v-model="form.stock"
            :state="stockState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="descriptionState"
          label="Description"
          label-for="description-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="description-input"
            v-model="form.description"
            :state="descriptionState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="CategoryIdState"
          label="CategoryId"
          label-for="Category-input"
          invalid-feedback="Category is required"
        >
          <b-form-input
            id="Category-input"
            v-model="form.CategoryId"
            :state="CategoryIdState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
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
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.image_urlState = valid;
      this.priceState = valid;
      this.stockState = valid;
      this.descriptionState = valid;
      this.CategoryIdState = valid;
      return valid;
    },
    resetModal() {
      this.form = {};
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
      this.$axios({
        method: "post",
        url: "/products",
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
            title: "succes add product " + data.name,
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
            html: response.data.message.join("<br>"),
            showConfirmButton: true
            // timer: 1500
          });
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-product-add");
      });
    }
  }
};
</script>
<style scoped></style>
