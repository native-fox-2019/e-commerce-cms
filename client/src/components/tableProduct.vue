<template>
<div class="col-10">
    <tr class="row">
      <td class="col">Name</td>
      <td class="col">Stock</td>
      <td class="col">Image</td>
      <td class="col">Price</td>
      <td class="col">Action</td>
    </tr>
  <hr>
    <tr class="row borderBtm" v-for="(data,i) in getData" :key="data.id">
      <td class="col">{{i + 1}}</td>
      <td class="col">{{data.name}}</td>
      <td class="col">{{data.stock}}</td>
      <td class="col">
       <img :src="data.urlImage" alt="" style="width: 100px; height:100px;">
        </td>
      <td class="col">{{data.price}}</td>
      <td class="col buttons">
         <v-btn class="ma-2 roundBtn" tile outlined color="success" @click.prevent="editPage(data.id)">
      <v-icon left>mdi-pencil</v-icon> Edit
    </v-btn>
    <v-btn class="ma-2 roundBtn" tile outlined color="error" @click.prevent="deleteOrder(data.id)">
      <v-icon left>mdi-cancel</v-icon> Delete
    </v-btn>
      </td>
    </tr>
</div>
</template>

<script>
  export default {
    name: "tableProducts",
     computed: {
      getData() {
       return this.$store.state.allData
      }
    },
    created() {
      this.$store.dispatch("getAllData")
    },
    methods: {
      editPage(id) {
        this.$router.push({path: `/admins/editProduct/${id}`})
      },
      deleteOrder(id) {
        this.$axios({
          url: '/products/' + id,
          method: "DELETE",
          headers: ({token: localStorage.getItem('token')})
        })
        .then(()=>{
          this.$store.dispatch("getAllData")
          this.getData()
        })
        .catch(({response})=>{
          console.log(response);
        })
      }
    },
  }
</script>

<style>
.roundBtn{
  border-radius: 10px;
}
.buttons {
  display: flex;
  justify-content: flex-start;
}
.borderBtm {
  border-bottom: solid 1px black;
}
</style>