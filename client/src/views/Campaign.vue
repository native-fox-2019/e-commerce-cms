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
import Table from "../components/tableCampaign";
import Add from "../components/addCampaign";
import Edit from "../components/editCampaign";
export default {
  name: "Campaign",
  components: {
    Sidebar,
    Table,
    Add,
    Edit
  }
};
</script>
