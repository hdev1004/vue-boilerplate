<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { success, error } from '@/utils/vueAlert'

const quantity = ref(1)
const isUp = ref(false)
const preScrollTop = ref(0)
const item = ref<any>({})
const route = useRoute()
const thumbnailImage = ref('')
const htmlRef = ref(null)
const spinning = ref(false)

const inquiry_input = ref('')
const inquiry = ref<Array<any>>([])

window.scrollTo(0, 0)

const clickHeart = async () => {
  const productId = route.query.id

  console.log('click heart : ', item.value)
  try {
    if (item.value.isFavor) {
      let data = await AxiosInstance.delete(`/api/product-service/products/${productId}/favorite`)
      if (data === null) return
      item.value.isFavor = false
    } else {
      let data = await AxiosInstance.post(`/api/product-service/products/${productId}/favorite`)
      if (data === null) return
      item.value.isFavor = true
    }
  } catch (err: any) {
    error('오류가 발생했습니다.')
    console.log(err)
  }
}
const loading = async () => {
  spinning.value = true
  const productId = route.query.id
  let res = null

  try {
    res = await AxiosInstance.get(`/api/product-service/products/${productId}`)
    if (res === null) return
    item.value = res.data

    res = await AxiosInstance.get(`/api/product-service/products/${productId}/inquires`)
    if (res === null) return
    inquiry.value = res.data.inquires
    console.log(inquiry.value)
    spinning.value = false
  } catch (err: any) {
    console.log('Error : ', err)
  }
}

loading()

const inquiryClick = async () => {
  const productId = route.query.id
  let res = null

  if (inquiry_input.value.trim() === '') return
  try {
    res = await AxiosInstance.post(`/api/product-service/products/${productId}/inquires`, {
      content: inquiry_input.value
    })
    if (res === null) return

    success('문의가 작성되었습니다.')

    res = await AxiosInstance.get(`/api/product-service/products/${productId}/inquires`)
    if (res === null) return

    inquiry_input.value = ''
    inquiry.value = res.data.inquires
    console.log(inquiry.value)
  } catch (err: any) {
    error('오류가 발생했습니다.')
    console.log(err.response.data.message)
  }
}

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
    <a-spin :spinning="spinning">
      <div class="item_divistion">
        <div class="item_description">
          <img
            class="thumbnail_img"
            :src="`/api/product-service/products/images/${item.thumbnailImageId}`"
          />
          <div class="item_html" v-html="item.content" ref="htmlRef"></div>

          <div class="inquiry">
            <div class="inquiry_register">
              <textarea placeholder="문의 내용을 작성해주세요" v-model="inquiry_input" />
              <div class="inquiry_btn" @click="inquiryClick">등록</div>
            </div>

            <div class="inquiry_line"></div>

            <div>
              <div class="inquiry_table_title"></div>
              <div class="inquiry_row" v-for="(item, index) in inquiry" v-bind:key="index">
                <div class="inquiry_q">{{ item.content }}</div>
                <div class="inquiry_a" v-if="item.answer">{{ item.answer }}</div>
              </div>
            </div>
          </div>
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
            <div class="heart" @click="clickHeart">
              <img v-if="item.isFavor" src="@/assets/images/header/heartFill.png" />
              <img v-else src="@/assets/images/header/heart.png" />
            </div>
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
    </a-spin>
  </section>
</template>

<style lang="scss">
@import url('./item.scss');
</style>
