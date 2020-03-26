<template>
  <div>
    <Nav></Nav>
    <div class="row">
      <Sidebar class="col-2"></Sidebar>
      <router-view>
        <slot>wkwkwkwk</slot>
      </router-view>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
export default {
  name: "Home",
  components: {
    Nav,
    Sidebar
  }
};
</script>

<style></style>
