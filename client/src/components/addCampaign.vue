<template>
  <b-modal id="addCampaign" hide-footer title="New Campaign" @hidden="resetModalData">
    <form @submit.prevent="add" ref="form" enctype="multipart/form-data">
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            placeholder="Image"
            :rounded="true"
            :rules="rules"
            v-model="input.file"
            style="cursor: pointer;"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <v-text-field v-model="input.name" label="Name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select v-model="input.status" :items="items" label="Status" dense solo></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select v-model="input.placement" :items="placement" label="Placement" dense solo></v-select>
        </v-col>
      </v-row>
      <v-btn
        class="mr-4"
        type="submit"
        @click="$bvModal.hide('addCampaign')"
        style="background-color:#39387a;color:white;"
      >submit</v-btn>
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
      items: ["Pending", "Upcoming", "On Going", "Ended", "Cancelled"],
      placement: [
        "Home - Cover",
        "Home - Carousel",
        "Home - Pop up",
        "Product - Pop up",
        "Product - check out"
      ],
      input: {
        file: null,
        name: "",
        status: "",
        placement: ""
      },
      rules: [
        value =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!"
      ]
    };
  },
  methods: {
    async add() {
      try {
        let formData = new FormData();
        formData.append("name", this.input.name);
        formData.append("file", this.input.file);
        formData.append("status", this.input.status);
        formData.append("placement", this.input.placement);
        let { data } = await axios({
          method: "post",
          url: "/campaign",
          data: formData,
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.resetModalData();
          this.$store.dispatch("getCampaign");
          Toast.fire({
            icon: "success",
            title: "Campaign created successfully"
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    resetModalData() {
      let stringDefault = null;
      let numberDefault = 0;
      let booleanDefault = false;
      Object.keys(this.input).forEach(key => {
        if (typeof this.input[key] === "number") {
          this.input[key] = numberDefault;
        } else if (typeof this.input[key] === "boolean") {
          this.input[key] = booleanDefault;
        } else {
          this.input[key] = stringDefault;
        }
      });
    }
  }
};
</script>