<template>
  <div>
    <b-card no-body class="overflow-hidden mt-3" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img :src="this.PropProduct.image_url" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="this.PropProduct.name">
            <b-card-text>{{this.PropProduct.price}}</b-card-text>
            <b-card-text>{{this.PropProduct.stock}}</b-card-text>
            <b-button pill variant="success" @click="Edit()">Edit</b-button>
            <b-button pill variant="primary" @click="Delete()">Delete</b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ["PropProduct"],
  data(){
      return{
          id:this.PropProduct.id
      }
  },
  methods:{
      Edit(){
          axios({
              method:"get",
              url:`http://localhost:3000/product/${this.id}`,
          })
      },
      Delete(){
          axios({
              method:"delete",
              url:`http://localhost:3000/product/${this.id}`,
              headers:{token:localStorage.getItem("token")}
          })
      }
  }
};
</script>