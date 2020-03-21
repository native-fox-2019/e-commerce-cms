<template>
    <div>
        <div class="divCenter">
            <span> Welcome {{this.name}} </span>
        </div>
        <hr>
        <hr>
        <div class="divCenter">
          <itemlist v-for="(data, idx) in $store.state.items" :key="idx" :data="data">
          </itemlist>
        </div>
        <div>
          <modals ></modals>
        </div>
    </div>
</template>
<script>
import Itemlist from '../components/itemlist.vue';
import modals from '../components/Editmodal.vue';

export default {
  data() {
    return {
      name: localStorage.getItem('name'),
    };
  },
  components: {
    Itemlist,
    modals,
  },
  methods: {
    addForm() {
      this.$router.push('/additem');
    },
  },
  created() {
    this.$store.dispatch('getAllItem');
  },

};
</script>
