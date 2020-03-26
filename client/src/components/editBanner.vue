<template>
  <div class="addAdminPage col-10">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Banner</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>   
              <v-col cols="12">
                <v-text-field label="title" v-model="title" required></v-text-field>
              </v-col>           
              <v-col cols="12">
                <v-text-field label="url image" v-model="urlImage" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="goHome">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click.prevent="editBanner">Edit</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "addBanner",
  data() {
    return {
      title: "",
      urlImage: "",
    }
  },
  created() {
    this.dataBanner()
  },
  methods: {
    dataBanner() {
      this.$axios({
        url: '/banners/' + this.$route.params.id,
        method: "GET",
        headers: ({token: localStorage.getItem('token')}),
      })
      .then(({data})=>{
        this.title = data.title 
        this.urlImage = data.urlImage 
      })
      .catch(({response})=>{
        console.log(response);
      })
    },
    editBanner() {
      this.$axios({
        url: `/banners/${this.$route.params.id}`,
        method: "PATCH",
        headers: ({token: localStorage.getItem('token')}),
        data: {
          title: this.title,
          urlImage: this.urlImage,
        }
      })
      .then(data => {
        console.log(data);
        this.title=""
        this.urlImage=""
        this.$router.push({path: '/admins/bannerList'})
      })
      .catch(({response}) => {
        console.log(response);
      })
    },
    goHome() {
      this.$router.push({path: '/admins/bannerList'})
    }
  }
}
</script>

<style>

</style>