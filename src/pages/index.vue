<script setup lang="ts">
import HomeItems from '@/components/Home/HomeItems.vue'
</script>

<template>
  <section class="banner">
    <a-carousel>
      <div>
        <img src="@/assets/images/main/banner1.jpg" alt="배너" />
      </div>
      <div>
        <img src="@/assets/images/main/banner2.jpg" alt="배너" />
      </div>
      <div>
        <img src="@/assets/images/main/banner3.jpg" alt="배너" />
      </div>
    </a-carousel>
  </section>
  <HomeItems title="위클리 베스트" tab="best" />
  <div style="margin-top: 200px"></div>
  <HomeItems title="신상품" tab="new" />
  <div style="margin-top: 200px"></div>
  <HomeItems title="스타일별 코디" tab="category" />
  <div style="margin-top: 200px"></div>
</template>

<style lang="scss" scoped>
/* For demo */

@import url('./index.scss');
</style>
