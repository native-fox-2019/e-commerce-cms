<template>
  <div class="col-10">
    <b-card>
      <b-card-header class="row">
        <div class="col-11"><h3>User List</h3></div>
        <div class="col-1">
          <b-button variant="success" v-b-modal.modal-user-add>
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
              <th scope="col">Email</th>
              <th scope="col">Is Admin</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="user in users" :key="user.id">
            <tr class="text-center">
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.admin }}</td>
              <td class="d-flex justify-content-end">
                <b-button
                  variant="primary"
                  class="mx-2"
                  v-b-modal.modal-user-edit
                  @click.prevent="editUser(user)"
                >
                  Edit
                </b-button>
                <b-button
                  variant="danger"
                  class="mx-2"
                  @click.prevent="deleteUser(user.id)"
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
    <AddUser></AddUser>
    <!-- MODAL EDIT USER -->
    <!-- <EditUser :user="user"></EditUser> -->
    <b-modal
      id="modal-user-edit"
      ref="modal"
      title="Edit User"
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
import AddUser from "./users/AddUser";
// import EditUser from "./users/EditUser";
export default {
  name: "User",
  data() {
    return {
      form: {},
      nameState: null,
      emailState: null,
      passwordState: null,
      submittedNames: []
      // userEdit: {}
    };
  },
  components: {
    AddUser
    // EditUser
  },
  computed: {
    users: function() {
      return this.$store.state.users;
    }
  },
  created() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    deleteUser(id) {
      this.$swal
        .fire({
          title: "Are you sure delete this user?",
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
              url: "/user/" + id,
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(({ data }) => {
                this.$store.dispatch("getUsers");
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
    editUser(user) {
      this.form = user;
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      this.emailState = valid;
      this.passwordState = valid;
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
      // console.log(this.form.id)
      this.$axios({
        method: "put",
        url: "/user/" + this.form.id,
        headers: {
          token: localStorage.getItem("token")
        },
        data: this.form
      })
        .then(({ data }) => {
          this.$store.dispatch("getUsers");
          console.log(data);
          this.$swal.fire({
            position: "top",
            icon: "success",
            title: "succes update user" + data.name,
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
            html: response.data.message.join("<br>"),
            showConfirmButton: true
            // timer: 1500
          });
        });
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-user-edit");
      });
    }
  }
};
</script>

<style scoped></style>
