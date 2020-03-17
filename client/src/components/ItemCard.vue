<template>
    <div>
        <h1>{{ item.name }}</h1>
        <span>{{ item.description }}</span>
        <slot>This will be displayed if there's no content available.</slot>
    </div>
</template>

<script>

export default {
  props: ['item'],
};
</script>

<style>
</style>
