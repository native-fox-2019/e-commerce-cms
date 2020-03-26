<template>
<div class="itemContainer border">
  <div class="titleContainer">
  <span class="itemTitle"> {{this.data.name}}</span>
  </div>
  <div class="descriptionContainer row">
      <img :src="this.data.image_url" style="width:120px; height:170px;">
      <div class="col">
      <span> price : RP {{this.data.price}}</span>
      </div>
      
      <div class="col">
      <span> stock : {{this.data.stock}} </span>
      </div>
      <div class="edit">
            <button class="btn btn-warning" @click.prevent="editThisData()">Edit</button>
            <button class="btn btn-danger" @click.prevent="deleteThisData()">Delete</button>
      </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2"

export default {
  props: ['data'],
  data() {
    return {
      id: this.data.id
    };
  },
methods: {

    deleteThisData() {
      swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.deleteAction()
          swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },

    editThisData() {
      axios({
        method: "get",
        url: `http://localhost:3000/products/${this.id}`,
        headers: { token: localStorage.getItem("token") }
      }).then(response => {
        this.$store.dispatch("holdEditData", response.data);
        this.$router.push("editPage");
      });
    },
    
    deleteAction() {
      axios({
        method: "delete",
        url: `http://localhost:3000/products/${this.id}`,
        headers: { token: localStorage.getItem("token") }
      }).then(response => {
        this.$store.dispatch("deleteData", this.id);
      });
    }
  }
}
</script>