<template>
  <div>
    <v-app id="inspire">
      <v-card style="color:#39387a;" class="mt-5">
        <v-card-title>
          Campaigns
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="campaigns"
          :search="search"
          :items-per-page="5"
          :footer-props="{
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
        }"
          style="color:#39387a;"
        >
          <template #item.updatedAt="{item}">{{new Date(item.updatedAt).toLocaleString()}}</template>
          <template #item.createdAt="{item}">{{new Date(item.createdAt).toLocaleString()}}</template>
          <template #item.image="{item}">
            <v-avatar class="m-2" size="54" v-if="item.image !== 'null'">
              <img :src="item.image" alt />
            </v-avatar>
            <v-avatar class="m-2" size="54" color="#39387a" v-else>
              <img src="../images/image.png" width="5px" alt />
            </v-avatar>
          </template>
          <template #item.action="{item}">
            <v-icon small v-b-modal.editCampaign @click="edit(item)" class="mr-2">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-btn absolute dark fab bottom left color="#39387a" v-b-modal.addCampaign>
          <v-icon class="add">mdi-plus</v-icon>
        </v-btn>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
      search: "",
      headers: [
        {
          text: "Image",
          align: "center",
          sortable: false,
          value: "image"
        },
        { text: "Name", value: "name" },
        { text: "Status", value: "status" },
        { text: "Placement", value: "placement" },
        { text: "Created By", value: "User.name" },
        { text: "Updated At", value: "updatedAt" },
        { text: "Created At", value: "createdAt" },
        { text: "Actions", value: "action", sortable: false }
      ]
    };
  },
  created() {
    this.$store.dispatch("getCampaign");
  },
  computed: {
    ...mapState(["campaigns"])
  },
  methods: {
    async deleteItem(id) {
      try {
        let { value } = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          focusCancel: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonColor: "#39387a",
          cancelButtonColor: "#b3362d",
          confirmButtonText: "Yes, delete it!"
        });
        if (value) {
          let { data } = await axios.delete(`campaign/${id}`, {
            headers: {
              access_token: localStorage.access_token
            }
          });
          if (data) {
            this.$store.dispatch("getCampaign");
            Toast.fire({
              icon: "success",
              title: "Campaign has been deleted."
            });
          }
        }
      } catch (error) {
        errorHandler(error);
      }
    },
    edit(data) {
      this.$store.commit("oneCampaign", data);
    }
  }
};
</script>
<style>
.add:focus {
  border-color: #ffffff;
  outline: none;
}
</style>