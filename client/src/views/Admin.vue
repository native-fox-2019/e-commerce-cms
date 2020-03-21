<template>
  <div class="d-flex">
    <Sidebar></Sidebar>
    <Edit></Edit>
    <Add></Add>

    <div class="container p-0">
      <Table></Table>
    </div>

    <router-view />
  </div>
</template>
<script>
import Sidebar from "../components/sidebar";
import Table from "../components/tableAdmin";
import Edit from "../components/editAdmin";
import Add from "../components/addAdmin";

export default {
  components: {
    Sidebar,
    Table,
    Edit,
    Add
  }
};
</script>
