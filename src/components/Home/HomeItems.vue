<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'

const props = defineProps({
  /**Modal 여부 */
  title: String,
  type: String
})

let itemList = ref<
  Array<{
    thumbnailImageId: number
    name: string
    quantity: number
    unitPrice: number
  }>
>([])

const getItemList = async () => {
  try {
    let data = await AxiosInstance.get('/api/product-service/products/search')
    itemList.value = data.data?.contents

    console.log(itemList.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 도중 오류가 발생했습니다')
  }
}

getItemList()
</script>

<template>
  <section class="homeitems_container">
    <div class="homeitems_logo">{{ props.title }}</div>
    <div class="homeitems_items">
      <div v-for="(item, index) in itemList" :key="`item${index}`">
        <div class="homeitems_card">
          <img
            :src="`http://211.218.223.120:30002/product-service/products/images/${item.thumbnailImageId}`"
            @click="$router.push('item')"
          />
          <div class="homeitems_rank">{{ index + 1 }}</div>
          <div class="homeitems_title">{{ item.name }}</div>
          <div class="homeitems_price">{{ item.unitPrice.toLocaleString() }}</div>
          <div class="homeitems_review">리뷰 {{ 0 }}건</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./HomeItems.scss');
</style>
