<template>
  <div class="addAdminPage col-10">
      <v-card>
        <v-card-title>
          <span class="headline">Add Admin</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>              
              <v-col cols="12">
                <v-text-field label="Username" v-model="username" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email" v-model="email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.prevent="goHome">Close</v-btn>
          <v-btn color="blue darken-1" text @click.prevent="addAdmin">Add</v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  name: "addAdmin",
  data() {
    return {
      username: "",
      password: "",
      email: "",
    }
  },
  methods: {
    addAdmin() {
      this.$axios({
        url: '/admins/register',
        method: "POST",
        headers: ({token: localStorage.getItem('token')}),
        data: {
          username: this.username,
          password: this.password,
          email: this.email,
        }
      })
      .then(data => {
        this.username = "",
        this.password = "",
        this.email = ""
        this.$router.push({path: '/admins/adminList'})
      })
      .catch(({response}) => {
        console.log(response);
      })
    },
    goHome() {
      this.$router.push({path: '/admins'})
    }
  }
}
</script>

<style>

</style>