<template>
  <div>
    <b-modal
      id="modal-user-add"
      ref="modal"
      title="Add Admin"
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
          :state="emailState"
          label="Email"
          label-for="email-input"
          invalid-feedback="Email not Valid"
        >
          <b-form-input
            id="email-input"
            v-model="form.email"
            type="email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          :state="emailState"
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            v-model="form.password"
            type="password"
            :state="passwordState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      // name: "",
      // email: "",
      // password: "",
      form: {
        name: "",
        email: "",
        password: ""
      },
      nameState: null,
      emailState: null,
      passwordState: null,
      submittedNames: []
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.emailState = valid;
      this.passwordState = valid;
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
        url: "/user",
        headers: {
          token: localStorage.getItem("token")
        },
        data: this.form
      })
        .then(data => {
          this.$store.dispatch("getUsers");
          console.log(data);
          this.$swal.fire({
            position: "top",
            icon: "success",
            title: "succes add",
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
        this.$bvModal.hide("modal-user-add");
      });
    }
  }
};
</script>
<style scoped></style>
