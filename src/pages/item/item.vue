<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { success, error } from '@/utils/vueAlert'
import Cookies from 'js-cookie'

const isNone = ref(false)
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

const memberInfoString = Cookies.get('member')
let memberInfo = ref<any>({})

if (memberInfoString) {
  memberInfo.value = JSON.parse(memberInfoString)
}

window.scrollTo(0, 0)

function formatDatetime(datetimeStr: string) {
  const date = new Date(datetimeStr)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} ${hours}.${minutes}`
}

const inquiryDelete = async (inquiryId: number) => {
  const productId = route.query.id
  let res = null

  try {
    res = await AxiosInstance.delete(`/api/product-service/products/inquires/${inquiryId}`)
    if (res === null) return

    success('문의가 삭제되었습니다.')

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

const clickCart = async () => {
  let id = route.query.id
  try {
    let data = await AxiosInstance.post('/api/order-service/carts', {
      productId: id,
      quantity: quantity.value
    })
    if (data === null) return
    success('장바구니에 담겼습니다.')
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
    error('존재하지 않는 상품 입니다.')
    spinning.value = false
    isNone.value = true
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
      <div class="item_divistion" v-if="!isNone">
        <div class="item_description">
          <img
            class="thumbnail_img"
            :src="`/api/product-service/products/images/${item.thumbnailImageId}`"
          />
          <div class="item_html" v-html="item.content" ref="htmlRef"></div>

          <div class="inquiry">
            <div class="inquiry_register">
              <textarea
                @focus="isUp = true"
                placeholder="문의 내용을 작성해주세요"
                v-model="inquiry_input"
              />
              <div class="inquiry_btn" @click="inquiryClick">등록</div>
            </div>

            <div class="inquiry_line"></div>

            <div>
              <div class="inquiry_table_title"></div>
              <div class="inquiry_row" v-for="(item, index) in inquiry" v-bind:key="index">
                <div class="inquiry_q">
                  <div class="inquiry_div">
                    <div class="content">{{ item.content }}</div>

                    <div
                      class="delete"
                      @click="inquiryDelete(item.productInquireId)"
                      v-if="memberInfo.memberId == item.memberId"
                    >
                      삭제
                    </div>
                  </div>
                  <div>{{ formatDatetime(item.createdAt) }}</div>
                </div>
                <div class="inquiry_a" v-if="item.answer">{{ item.answer.content }}</div>
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
            <div class="cart" @click="clickCart">장바구니</div>
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
      <div v-else class="not_found">
        <div class="not_found_tit">존재하지 않는 상품입니다</div>
        <img src="@/assets/images/main/empty.png" class="empty" />
      </div>
    </a-spin>
  </section>
</template>

<style lang="scss">
@import url('./item.scss');
</style>
