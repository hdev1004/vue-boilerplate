<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'

const quantity = ref(1)
const isUp = ref(false)
const preScrollTop = ref(0)
const item = ref<any>({})
const route = useRoute()
const thumbnailImage = ref('')
const htmlRef = ref(null)

window.scrollTo(0, 0)

const loading = async () => {
  const productId = route.query.id
  let res = null

  try {
    res = await AxiosInstance.get(`/api/product-service/products/${productId}`)
    item.value = res.data
  } catch (err: any) {
    console.log('Error : ', err)
  }
}

loading()

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
  if (htmlRef.value) {
    console.log('HTML : ', htmlRef.value)
    let images = document.querySelectorAll('img')
    console.log('images : ', images)
  }
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
        <img
          class="thumbnail_img"
          :src="`/api/product-service/products/images/${item.thumbnailImageId}`"
        />
        <div class="item_html" v-html="item.content" ref="htmlRef"></div>
      </div>
      <div :class="`item_payment item_payment_isUp_${isUp}`">
        <div class="item_title_container">
          <div class="item_title">{{ item.name }}</div>
          <div class="item_price">{{ item.unitPrice }}</div>
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
            {{ (quantity * item.unitPrice).toLocaleString() }}원 ({{ quantity }}개)
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
@import url('./item.scss');
</style>
