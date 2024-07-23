<script setup lang="ts"></script>

<template>
  <section class="coupon_container">
    <div class="coupon_title">쿠폰 리스트</div>
    <div class="coupon_contents">
      <div class="coupon_card" v-for="item in [1, 2, 3, 4, 5]" v-bind:key="`item${item}`">
        <img src="@/assets/images/main/coupon1.png" />
        <div>쿠폰 받기</div>
      </div>
      <div class="coupon_card">
        <img src="@/assets/images/main/coupon2.png" />
        <div>쿠폰 받기</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./coupon.scss');
</style>
