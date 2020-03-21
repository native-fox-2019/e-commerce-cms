<template>
  <v-container class="container">
    <v-card
      height="400"
      width= "200"
      class="overflow-hidden"
    >
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :src="bg"
        absolute
        dark
      >
        <v-list
          dense
          nav
          class="py-0"
        >
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Admin</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click.prevent="goTo(item.title)"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard', fungsi:'goToAdd()' },
          { title: 'Add Product', icon: 'mdi-image' },
          { title: 'Admin List', icon: 'mdi-help-box' },
          { title: 'Add Admin', icon: 'mdi-help-box' },
          { title: 'Banner List', icon: 'mdi-image' },
          { title: 'Add Banner', icon: 'mdi-image' },
        ],
        color: 'primary',
        colors: [
          'primary',
          'blue',
          'success',
          'red',
          'teal',
        ],
        right: false,
        miniVariant: true,
        expandOnHover: true,
        background: true,
      }
    },
    computed: {
      bg () {
        return this.background ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg' : undefined
      },
    },
    methods:{
      goTo(title) {
        if (title==="Home") {
          this.$router.push({path: "/admins"})
        } else if (title==="Add Product"){
          this.$router.push({path: "/admins/addProduct"})          
        } else if (title === "Add Admin") {
          this.$router.push({path: "/admins/addAdmin"})
        } else if (title === "Admin List") {
          this.$router.push({path: "/admins/adminList"})
        } else if (title === "Add Banner") {
          this.$router.push({path: "/admins/addBanner"})
        } else if (title === "Banner List") {
          this.$router.push({path: "/admins/bannerList"})
        }
        
      }
    }
  }
</script>

<style>

</style>