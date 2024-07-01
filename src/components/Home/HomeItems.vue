<script setup lang="ts">
const props = defineProps({
  /**Modal 여부 */
  title: String,
  type: String
})

const items = [
  {
    itemId: 'Jer123',
    title: '[코튼스판] 골지크롭 반팔티셔츠',
    price: 19900,
    reviewQuantity: 30,
    rank: 1
  },
  {
    itemId: 'Efs512',
    title: '[COOL] 2-WAY 스트레치 파라슈트 팬츠',
    price: 49900,
    reviewQuantity: 20,
    rank: 2
  },
  {
    itemId: 'gaq951',
    title: '[COOL] 썸머 케이블 반팔니트',
    price: 29900,
    reviewQuantity: 20,
    rank: 3
  },
  {
    itemId: 'pas589',
    title: '[COOL] 와이드 진',
    price: 49900,
    reviewQuantity: 12,
    rank: 4
  },
  {
    itemId: 'pqw478',
    title: '오버핏 반팔 옥스포드 셔츠',
    price: 35900,
    reviewQuantity: 61,
    rank: 5
  },
  {
    itemId: 'etq554',
    title: '[남녀공용] 데님 밴딩 쇼츠 (셋업)',
    price: 29900,
    reviewQuantity: 21,
    rank: 6
  },
  {
    itemId: 'qwe651',
    title: '(ATLANTA) 래글런 셔링 크롭 반팔티',
    price: 25900,
    reviewQuantity: 32,
    rank: 7
  },
  {
    itemId: 'ppo989',
    title: '[소프트코튼] 베이직 하프팬츠',
    price: 25900,
    reviewQuantity: 34,
    rank: 8
  }
]
</script>

<template>
  <section class="homeitems_container">
    <div class="homeitems_logo">{{ props.title }}</div>
    <div class="homeitems_items">
      <div v-for="item in items" :key="`item${item.rank}`">
        <div class="homeitems_card">
          <img src="@/assets/images/main/clothes1.jpg" @click="$router.push('item')" />
          <div class="homeitems_rank">{{ item.rank }}</div>
          <div class="homeitems_title">{{ item.title }}</div>
          <div class="homeitems_price">{{ item.price.toLocaleString() }}</div>
          <div class="homeitems_review">리뷰 {{ item.reviewQuantity }}건</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./HomeItems.scss');
</style>
