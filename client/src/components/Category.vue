<template>
  <div class="col-10">
    <b-card>
      <b-card-header class="row">
        <div class="col-11"><h3>Category List</h3></div>
        <div class="col-1">
          <b-button variant="success" v-b-modal.modal-category-add>
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="category in categories" :key="category.id">
            <tr class="text-center">
              <th scope="row">{{ category.id }}</th>
              <td>{{ category.name }}</td>
              <td class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mx-2"
                  v-b-modal.modal-category-edit
                  @click.prevent="editCategory(category)"
                >
                  Edit
                </b-button>
                <b-button
                  variant="danger"
                  class="mx-2"
                  @click.prevent="deleteUser(category.id)"
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
    <AddCategory></AddCategory>
    <!-- MODAL EDIT USER -->
    <b-modal
      id="modal-category-edit"
      ref="modal"
      title="Edit Category"
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
import AddCategory from "./categories/AddCategory";
export default {
  name: "Category",
  data() {
    return {
      form: {
        name: ""
      },
      nameState: null
    };
  },
  components: {
    AddCategory
  },
  computed: {
    categories: function() {
      return this.$store.state.categories;
    }
  },
  created() {
    this.$store.dispatch("getCategories");
  },
  methods: {
    deleteUser(id) {
      this.$swal
        .fire({
          title: "Are you sure delete this category?",
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
              url: "/categories/" + id,
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                this.$store.dispatch("getCategories");
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
    editCategory(category) {
      // console.log(category)
      this.form = category;
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
        url: "/categories/" + this.form.id,
        headers: {
          token: localStorage.getItem("token")
        },
        data: this.form
      })
        .then(({ data }) => {
          this.$store.dispatch("getCategories");
          console.log(data);
          this.$swal.fire({
            position: "top",
            icon: "success",
            title: "succes update category",
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
        this.$bvModal.hide("modal-category-edit");
      });
    }
  }
};
</script>

<style scoped></style>
