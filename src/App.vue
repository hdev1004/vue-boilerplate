<script setup lang="ts">
import Header from './layouts/header/Header.vue'
import Footer from './layouts/footer/Footer.vue'
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
html,
body {
  padding: 0px;
  margin: 0px;
}
</style>
