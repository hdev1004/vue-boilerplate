<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'
import Cookies from 'js-cookie'

const memberString = Cookies.get('member')
const member = memberString ? JSON.parse(memberString) : ''
const itemList = ref<Array<any>>([])
const router = useRouter()

const itemClick = (itemId: number) => {
  router.push(`/item?id=${itemId}`)
}

const closeClick = async (itemId: number) => {
  try {
    let data = await AxiosInstance.delete(`/api/product-service/products/${itemId}/favorite`)
    if (data === null) return
    success('위시리스트에서 제외되었습니다.')
    getItmeList()
  } catch (err: any) {
    error('오류가 발생했습니다')
    console.log(err)
  }
}

const getItmeList = async () => {
  try {
    let data = await AxiosInstance.get(
      '/api/product-service/members/products/favorites?page=1&size=20'
    )
    if (data === null) return
    itemList.value = data.data
    console.log(itemList.value)
  } catch (err: any) {
    error('데이터 불러오는도중 오류가 발생했습니다.')
    console.log(err)
  }
}

getItmeList()
</script>

<template>
  <section class="wishlist_container">
    <div class="wishlist_logo">위시리스트</div>

    <div class="wishlist_description">
      <div class="wishlist_textblock">{{ member?.memberName }}님의 위시리스트</div>
    </div>

    <div class="wishlist_cards">
      <div class="wishlist_card" v-for="(item, index) in itemList" v-bind:key="`item${index}`">
        <img
          class="wishlist_image"
          :src="`/api/product-service/products/images/${item.thumbnailImageId}`"
          alt="이미지"
          @click="itemClick(item.productId)"
        />
        <div class="wishlist_title">{{ item.name }}</div>
        <div class="wishlist_subtitle">{{ item.description }}</div>
        <div class="wishlist_price">{{ item.unitPrice.toLocaleString() }}</div>
        <div class="wishlist_delete_container" @click="closeClick(item.productId)">
          <img class="wishlist_delete" src="@/assets/images/header/closeWhite.png" alt="쓰레기통" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./wishlist.scss');
</style>
