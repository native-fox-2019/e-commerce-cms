<template>
  <div  style="height´:80%;">
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Product"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk(dataAdd)"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit({name,category,description,price,stock,image_url})">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="dataAdd.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Category"
          label-for="category-input"
          invalid-feedback="Category is required"
        >
          <b-form-input
            id="category-input"
            v-model="dataAdd.category"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Description"
          label-for="des-input"
          invalid-feedback="Description is required"
        >
          <b-form-input
            id="des-input"
            v-model="dataAdd.description"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Price"
          label-for="price-input"
          invalid-feedback="Price is required"
        >
          <b-form-input
            id="price-input"
            v-model="dataAdd.price"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Stock"
          label-for="stock-input"
          invalid-feedback="Stock is required"
        >
          <b-form-input
            id="stock-input"
            v-model="dataAdd.stock"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          :state="nameState"
          label="Image URL"
          label-for="url-input"
          invalid-feedback="Image URL is required"
        >
          <b-form-input
            id="url-input"
            v-model="dataAdd.image_url"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

      </form>
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        nameState: null,
        submittedNames: [],
        dataAdd: {
          name: "",
          category: "",
          description: "",
          price: "",
          stock: "",
          image_url: ""

        }
      }
    },
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk() {
          this.handleSubmit()
          const data = {
              name : this.dataAdd.name,
              category : this.dataAdd.category,
              description : this.dataAdd.description,
              price : this.dataAdd.price,
              stock : this.dataAdd.stock,
              image_url : this.dataAdd.image_url,
              
          }
        this.$store.dispatch('addData', data)

         this.dataAdd = {
          name: "",
          category: "",
          description: "",
          price: "",
          stock: "",
          image_url: ""

        }
      },
      handleSubmit(data) {
          console.log(data)
          
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      
    }
  }
</script>