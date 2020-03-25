<template>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <Add></Add>
    <Edit></Edit>
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
import Edit from "../components/edit";

export default {
  components: {
    Sidebar,
    Table,
    Add,
    Edit
  }
};
</script>
