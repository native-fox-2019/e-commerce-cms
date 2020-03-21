<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="this.PropProduct.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="this.PropProduct.name">
            <b-card-text>Price : Rp {{ this.PropProduct.price }}</b-card-text>
            <b-card-text>Stock : {{ this.PropProduct.stock }}</b-card-text>
            <b-button pill variant="warning" @click.prevent="Edit()">Edit</b-button>
            <b-button pill variant="danger" @click.prevent="Delete()">Delete</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';

export default {
  props: ["PropProduct"],
  data() {
    return {
      id: this.PropProduct.id
    };
  },
  methods: {
    Edit() {
      axios({
        method: "get",
        url: `http://localhost:3000/product/${this.id}`,
        headers: { token: localStorage.getItem("token") }
      }).then(response => {
        console.log("ini response", response.data);
        this.$store.dispatch("holdEditData", response.data);
        this.$router.push("Edit");
      });
    },
    Delete() {
      Swal.fire({
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },

    deleteAction() {
      axios({
        method: "delete",
        url: `http://localhost:3000/product/${this.id}`,
        headers: { token: localStorage.getItem("token") }
      }).then(response => {
        console.log(response.data);
        this.$store.dispatch("deleteData", this.id);
      });
    }
  }
};
</script>