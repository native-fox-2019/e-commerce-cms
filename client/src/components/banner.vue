<template>
  <div class="mt-5">
    <hr>
    <h3><strong>Banner List</strong></h3>
    <div class="row mt-5">
      <div class="col-3 mb-3" v-for="item in banner" :key="item.id">
        <p>{{ item.name }}</p>
        <img :src="item.url" alt="" style="width:100%; height:150px;" /><br />
        <button class="btn btn-outline-danger mt-2" @click="deleteBanner(item.id)">
          delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  created() {
    this.getBanner();
  },
  data() {
    return {
      banner: null
    };
  },
  methods: {
    getBanner() {
      axios({
        method: "GET",
        url: "https://peaceful-thicket-02203.herokuapp.com/products/banner",
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          data.data.banners.sort((a, b) => a.id - b.id);
          this.banner = data.data.banners;
        })
        .catch(response => {
          console.log(response);
        });
    },
    deleteBanner(id) {
      axios({
        method: "DELETE",
        url: `https://peaceful-thicket-02203.herokuapp.com/products/banner/${id}`,
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          Swal.fire({
            icon: "success",
            title: data.data
          });
          this.getBanner();
        })
        .catch(response => {
          Swal.fire({
            icon: "warning",
            title: response.response.data.msg
          });
        });
    }
  }
};
</script>
