<template>
  <div class="alert">
  <span class="closebtn" @click.prevent="hideAlert">&times;</span>
  {{isError.msg}}
</div>
</template>

<script>
export default {
  name: 'Alert',
  props: ['isError'],
  data () {
    return {
      show: true
    }
  },
  methods: {
    hideAlert () {
      this.$emit('hide', false)
      this.show = false
    }
  }
}
</script>

<style>
.alert {
  position: fixed;
  width: 95vw;
  padding: 20px;
  background-color: #f44336; /* Red */
  color: white;
  margin-bottom: 15px;
}

.closebtn {
  margin-left: 20px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>
