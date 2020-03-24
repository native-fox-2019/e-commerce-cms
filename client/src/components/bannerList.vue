<template>
<div class="col-10">
    <tr class="row justify-center">
      <td class="col">No.</td>
      <td class="col">Title</td>
      <td class="col">Image</td>
      <td class="col">Actions</td>      
    </tr>
  <hr>
    <tr class="row border" v-for="(data, index) in getData" :key="data.id" >      
      <td class="col">{{index + 1}}</td>
      <td class="col">{{data.title}}</td>
      <td>
       <img :src="data.urlImage" alt="" style="width: 100px; height:100px; ">
      </td>
      <td class="col">
        <v-btn class="ma-2 roundBtn" tile outlined color="success" @click.prevent="editPage(data.id)">
          <v-icon left>mdi-pencil</v-icon> Edit
        </v-btn>
        <v-btn class="ma-2 roundBtn" tile outlined color="error" @click.prevent="deleteBanner(data.id)">
          <v-icon left>mdi-cancel</v-icon> Delete
        </v-btn>
      </td>
    </tr>
    <hr>
</div>
</template>

<script>
export default {
  name: 'bannerList',
  computed: {
    getData() {
      return this.$store.state.banners
    }
  },
  created() {
    this.$store.dispatch("getBanners") 
  },
  methods: {
    deleteBanner(id) {
      this.$axios({
        url: '/banners/' + id,
        headers: ({ token: localStorage.getItem("token") }),
        method: "DELETE",
      })
        .then(() => {
          this.$store.dispatch('getBanners')
          this.getData()
      })
        .catch(({response}) => {
          console.log(response);
        })
    },
    editPage(id) {
      this.$store.dispatch('dataEditBanner', id)
      this.$router.push({ path: '/admins/editBanner/'+id})
    }
  }
}
</script>

<style>
.border{
  border-bottom: solid black 1px;
}
</style>