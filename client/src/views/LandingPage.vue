<template>
    <div>
        <Navbar></Navbar>
        <div class="container" style="min-height:600px;">
            <ItemList></ItemList>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ItemList from '@/components/ItemList.vue';

export default {
  components: {
    Navbar,
    Footer,
    ItemList,
  },
};
</script>

<style scoped>

</style>
