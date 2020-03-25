<template>
  <div>
    <v-card height="100vh" style="border-radius:0;">
      <v-navigation-drawer permanent dark style=" background-color: #39387a;">
        <v-list dense nav class="py-0">
          <v-list-item two-line class="px-0">
            <img
              src="../images/logo.png"
              width="300px"
              alt
              style="margin-left: -50px; margin-bottom: -30px;"
            />
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link @click="item.route">
            <v-list-item-icon>
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="p-4">
            <v-btn block text large @click.prevent="logout">
              <v-icon>mdi-logout</v-icon>Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Products",
          icon: "mdi-package-variant",
          route: this.product
        },
        {
          title: "Campaigns",
          icon: "mdi-view-dashboard",
          route: this.campaign
        },
        { title: "Admins", icon: "mdi-account-multiple", route: this.admin }
      ]
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({
        path: "/login"
      });
    },
    product() {
      this.$router.push({
        path: "/"
      });
    },
    campaign() {
      this.$router.push({
        path: "/campaign"
      });
    },
    admin() {
      this.$router.push({
        path: "/admin"
      });
    }
  }
};
</script>