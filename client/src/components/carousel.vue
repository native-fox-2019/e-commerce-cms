<template>
<div class="container carousel">
    <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
    class="carous"
    height="100%"
    width="100%"
      v-for="(banner, i) in banners"
      :key="i"
      :src="banner.urlImage"
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
        </v-row>
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
  export default {
    name: 'Carousel',
    data () {
      return {
      }
    },
    created() {
      this.$store.dispatch('getBanners')
    },
    computed: {
      banners() {
        console.log(this.$store.state.banners);
        return this.$store.state.banners
      }
    }
  }
</script>

<style scoped>
.carousel{
  margin-top: 60px;
}
</style>