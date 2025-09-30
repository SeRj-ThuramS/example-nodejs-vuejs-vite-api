<script setup>

</script>

<template>
    <div style="border: 2px solid red">
        <h1>DefaultLayout.vue</h1>

        <nav>
            <router-link to="/">Главная</router-link>
            <router-link to="/about">О нас</router-link>
            <router-link to="/contact">Контакты</router-link>
        </nav>

        <slot/>
    </div>
</template>

<style scoped>

</style>