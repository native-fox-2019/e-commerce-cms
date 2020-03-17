<template>
    <div>
        <h1>{{ item.name }}</h1>
        <span>{{ item.description }}</span>
    </div>
</template>

<script>

export default {
    props: ['item']
};
</script>

<style>
</style>