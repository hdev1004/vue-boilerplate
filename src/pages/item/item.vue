<script setup lang="ts">
const quantity = ref(1)
const isUp = ref(false)
const preScrollTop = ref(0)
window.scrollTo(0, 0)

const handleScroll = () => {
  let nextScrollTop = window.scrollY
  if (preScrollTop.value < nextScrollTop) {
    isUp.value = false
  } else {
    // (preScrollTop > nextScrollTop)
    isUp.value = true
  }
  preScrollTop.value = nextScrollTop
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const down = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}

const up = () => {
  quantity.value += 1
}
</script>

<template>
  <section class="item_container">
    <div class="item_divistion">
      <div class="item_description">
        <img src="@/assets/images/main/clothes1.jpg" />
        <img src="@/assets/images/main/clothes2.jpg" />
        <img src="@/assets/images/main/clothes3.jpg" />
        <img src="@/assets/images/main/clothes4.jpg" />
      </div>
      <div :class="`item_payment item_payment_isUp_${isUp}`">
        <div class="item_title_container">
          <div class="item_title">[남녀공용] 데님 밴딩 쇼츠</div>
          <div class="item_price">19,900</div>
        </div>

        <div class="item_line"></div>

        <div class="quantity_container">
          <div class="minus" @click="down">-</div>
          <div class="quantity">{{ quantity }}</div>
          <div class="plus" @click="up">+</div>
        </div>

        <div class="item_icons">
          <div class="heart"><img src="@/assets/images/header/heart.png" /></div>
          <div class="cart">장바구니</div>
          <div class="buy">바로구매</div>
        </div>

        <div class="total">
          <div class="total_text">총 상품금액</div>
          <div class="total_quantity">
            {{ (quantity * 19900).toLocaleString() }}원 ({{ quantity }}개)
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./item.scss');
</style>
