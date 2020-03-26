<template>
  <div class="home">
    <Carousel />
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/card.vue";
import Carousel from "@/components/carousel.vue";

export default {
  name: "Home",
  components: {
    Card,
    Carousel
  }
};
</script>
