<script setup lang="ts">
import BaseInputText from '@/components/BaseInputText.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useCounterStore } from '@/stores/counter'
</script>

<template>
  <section class="banner">
    <a-carousel :after-change="onChange">
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
  <div class="blank"></div>
  <div class="blank"></div>
  <div class="blank"></div>
</template>

<style lang="scss" scoped>
/* For demo */

@import url('./index.scss');
</style>
