<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'

const couponList = ref<Array<any>>([])

const getCoupon = async (item: any) => {
  console.log(item)
  try {
    let data = await AxiosInstance.post(`/api/order-service/members/coupon/${item.couponId}`)
    if (data === null) return
    success(`'${item.name}' 쿠폰을 받았습니다 🥳`)
  } catch (err: any) {
    warning(err.response.data.message)
  }
}

const getCouponList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/coupon?disabled=false')
    if (data === null) return
    couponList.value = data.data.coupons
    console.log(couponList.value)
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다.')
  }
}

const load = () => {
  getCouponList()
}

load()
</script>

<template>
  <section class="coupon_container">
    <div class="coupon_title">쿠폰 리스트</div>
    <div class="coupon_contents">
      <div class="coupon_card" v-for="(item, index) in couponList" v-bind:key="`item${index}`">
        <div class="coupon_name">{{ item.name }}</div>
        <div class="image_container">
          <img
            :src="`/api/order-service/coupon/images/${item.couponImage.couponImageId}`"
            @click="getCoupon(item)"
          />
        </div>
        <div class="coupon_btn" @click="getCoupon(item)">쿠폰 받기</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./coupon.scss');
</style>
