<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Category: {{ category }}</div>
          <v-list-item-title class="headline mb-1">{{ name }}</v-list-item-title>
          <v-list-item-subtitle>Price: {{ price }}</v-list-item-subtitle>
          <v-list-item-subtitle>Stock: {{ stock }}</v-list-item-subtitle>
          <v-list-item-subtitle>last update: {{ updatedAt }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey">
          <v-img v-bind:src="image_url" />
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Edit</v-btn>
        <v-btn text @click="deleteProduct(id)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['id', 'image_url', 'name', 'category', 'price', 'stock', 'updatedAt'],
  methods: {
    deleteProduct(id) {
      this.$store.commit('deleteProduct', id);
    },
    update() {},
  },
};
</script>
