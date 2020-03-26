<template>
  <div>
    <b-modal
      id="modal-category-add"
      ref="modal"
      title="Add Category"
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
export default {
  name: "Addcategory",
  data() {
    return {
      form: {
        name: ""
      },
      nameState: null,
      submittedNames: []
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
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
        url: "/categories",
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
            title: "succes add category " + data.name,
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
        this.$bvModal.hide("modal-category-add");
      });
    }
  }
};
</script>
<style scoped></style>
