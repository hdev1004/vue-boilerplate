<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import HomeItems from '@/components/Home/HomeItems.vue'
import { error } from '@/utils/vueAlert'
const bannerList = ref<Array<any>>([])

const moveUrl = (url: string) => {
  if (url.trim() === '') return
  window.open(url, '_blank')
}

const getBannerList = async () => {
  try {
    let data = await AxiosInstance.get('/api/product-service/banners')
    bannerList.value = data.data.banners
    console.log('BANNERS : ', data.data.banners)
  } catch (err: any) {
    error('데이터를 불러오는 도중 오류가 발생했습니다.')
    console.log(err)
  }
}

getBannerList()
</script>

<template>
  <section class="banner">
    <a-carousel autoplay>
      <div v-for="(banner, index) in bannerList" v-bind:key="`item${index}`">
        <img
          class="banner_item"
          :src="`/api/product-service/banners/images/${banner.bannerImageId}`"
          alt="배너"
          @click="moveUrl(banner.url)"
        />
      </div>
    </a-carousel>
  </section>
  <HomeItems title="위클리 베스트" tab="best" />
  <div style="margin-top: 200px"></div>
  <HomeItems title="신상품" tab="new" />
  <div style="margin-top: 200px"></div>
  <HomeItems title="스타일별 코디" tab="category" />
  <div style="margin-top: 200px"></div>
</template>

<style lang="scss" scoped>
/* For demo */

@import url('./index.scss');
</style>
