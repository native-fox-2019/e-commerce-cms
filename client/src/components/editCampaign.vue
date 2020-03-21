<template>
  <b-modal id="editCampaign" hide-footer title="Edit Product" @hidden="resetImage">
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
          <v-select v-model="status" :items="items" label="Status" dense solo></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-select v-model="placement" :items="placements" label="Placement" dense solo></v-select>
        </v-col>
      </v-row>
      <v-btn
        class="mr-4"
        @click="$bvModal.hide('editCampaign')"
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
      items: ["Pending", "Upcoming", "On Going", "Ended", "Cancelled"],
      placements: [
        "Home - Cover",
        "Home - Carousel",
        "Home - Pop up",
        "Product - Pop up",
        "Product - check out"
      ],
      name: "",
      file: null,
      image: "",
      status: "",
      placement: "",
      id: "",
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
      return this.$store.state.oneCampaign;
    }
  },
  watch: {
    one() {
      this.name = this.one.name;
      this.image = this.one.image;
      this.status = this.one.status;
      this.placement = this.one.placement;
      this.id = this.one.id;
    }
  },
  methods: {
    async edit() {
      try {
        let formData = new FormData();
        formData.append("name", this.name);
        formData.append("file", this.file);
        formData.append("status", this.status);
        formData.append("placement", this.placement);
        let { data } = await axios({
          method: "put",
          url: `/campaign/${this.id}`,
          data: formData,
          headers: {
            access_token: localStorage.access_token
          }
        });
        if (data) {
          this.$store.dispatch("getCampaign");
          this.resetImage();
          Toast.fire({
            icon: "success",
            title: "Campaign has been edited."
          });
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    resetImage() {
      let resetImage = null;
      this.file = resetImage;
    }
  }
};
</script>