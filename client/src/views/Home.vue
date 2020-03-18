<template>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <Add></Add>
    <div class="container p-0">
      <Table></Table>
    </div>

    <router-view />
  </div>
</template>
<script>
import Sidebar from "../components/sidebar";
import Table from "../components/table";
import Add from "../components/add";

export default {
  components: {
    Sidebar,
    Table,
    Add
  }
};
</script>
