<template>
    <div>
        <div class="divCenter">
            <span> Welcome {{this.name}} </span>
        </div>
        <hr>
        <div class="divCenter">
          <a class="btn" @click="addForm()"> Add New Comic </a>
        </div>
        <hr>
        <div class="divCenter" v-if="$store.state.refresh==false">
          <itemlist v-for="(data, idx) in this.$store.state.items" :key="idx" :data="data">
          </itemlist>
        </div>
        <div class="divCenter" v-else>
          <itemlist v-for="(data, idx) in this.arrayItems" :key="idx" :data="data">
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
      arrayItems: [],
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
    this.arrayItems = this.$store.state.items;
  },

};
</script>
