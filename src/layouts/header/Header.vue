<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="header_container">
    <section class="header_blank"></section>

    <section class="header">
      <div class="logo">글루따띠온</div>

      <div class="menu_container">
        <div class="menu">BEST</div>
        <div class="menu">NEW</div>
        <div class="menu">CATEGORY</div>
      </div>

      <div class="icon_container">
        <img src="@/assets/images/header/search.png" />
        <img @click="router.push('login')" src="@/assets/images/header/user.png" />
        <img src="@/assets/images/header/shop.png" />
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./Header.scss');
</style>
