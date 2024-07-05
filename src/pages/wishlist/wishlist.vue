<script setup lang="ts">
import Cookies from 'js-cookie'

const memberString = Cookies.get('member')
const member = memberString ? JSON.parse(memberString) : ''
</script>

<template>
  <section class="wishlist_container">
    <div class="wishlist_logo">위시리스트</div>

    <div class="wishlist_description">
      <div class="wishlist_textblock">{{ member?.memberName }}님의 위시리스트</div>
    </div>

    <div class="wishlist_cards">
      <div class="wishlist_card" v-for="num in [1, 2, 3, 4, 5, 6, 7, 8]" v-bind:key="num">
        <img class="wishlist_image" src="@/assets/images/main/clothes2.jpg" alt="이미지" />
        <div class="wishlist_title">제품 이름</div>
        <div class="wishlist_subtitle">제품 상세 설명</div>
        <img class="wishlist_delete" src="@/assets/images/main/trash.png" alt="쓰레기통" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./wishlist.scss');
</style>
