<script setup>
</script>

<template>
    <component :is="this.$route.meta.layoutComponent">
        <slot />
    </component>
</template>

<style scoped>

</style>