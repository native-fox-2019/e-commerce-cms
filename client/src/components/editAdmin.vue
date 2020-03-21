<template>
  <b-modal id="editAdmin" hide-footer title="Edit Profile" @hidden="resetImage">
    <form @submit.prevent="edit" ref="form">
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-avatar class="m-2" size="65" :tile="true" color="#39387a">
            <img :src="image" width="5px" alt />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="New Image"
            :rounded="true"
            v-model="file"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-text-field v-model="name" label="Name"></v-text-field>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field v-model="email" label="Email"></v-text-field>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-text-field v-model="password" type="password" label="New Password"></v-text-field>
        </v-col>
      </v-row>
      <v-btn
        class="mr-4"
        @click="$bvModal.hide('editAdmin')"
        type="submit"
        style="background-color:#39387a;color:white;"
      >Edit</v-btn>
    </form>
  </b-modal>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  data() {
    return {
      name: "",
      file: null,
      image: "",
      email: "",
      oldPassword: "",
      password: "",
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Image size should be less than 2 MB!"
      ]
    };
  },
  computed: {
    one() {
      return this.$store.state.oneAdmin;
    }
  },
  watch: {
    one() {
      this.name = this.one.name;
      this.image = this.one.image;
      this.email = this.one.email;
      this.oldPassword = this.one.password;
      this.id = this.one.id;
    }
  },
  methods: {
    async edit() {
      try {
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("file", this.file);
        formData.append("image", this.image);
        formData.append("email", this.email);
        formData.append("password", this.password);
        formData.append("olPassword", this.oldPassword);
        let { data } = await axios({
          method: "put",
          url: `/user/${this.id}`,
          data: formData,
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.$store.dispatch("getAdmin");
          this.resetImage();
          Toast.fire({
            icon: "success",
            title: "User has been edited."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    resetImage() {
      let resetImage = null;
      let reset = "";
      this.file = resetImage;
      this.password = reset;
    }
  }
};
</script>