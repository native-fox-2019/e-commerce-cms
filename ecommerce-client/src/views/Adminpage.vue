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
        <div class="divCenter">
           <itemlist v-for="data in items" :key="data.id" :data="data"></itemlist>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Itemlist from '../components/itemlist.vue';

const axiosUrl = 'http://localhost:3000';

export default {
  data() {
    return {
      name: localStorage.getItem('name'),
      items: [],
    };
  },
  components: {
    Itemlist,
  },
  methods: {
    getAllItem() {
      axios({
        method: 'GET',
        url: `${axiosUrl}/product`,
        headers: {
          token: localStorage.getItem('token'),
        },
      })
        .then((data) => {
          console.log(data);
          this.items = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addForm() {
      this.$router.push('/additem');
    },
    getNewData(payload) {
      this.items.push(payload);
    },
  },
  created() {
    this.getAllItem();
  },
  watch: {
    items() {

    },
  },
};
</script>
