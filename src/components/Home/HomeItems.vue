<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'

const router = useRouter()

const props = defineProps({
  /**Modal 여부 */
  title: String,
  type: String
})

let itemList = ref<
  Array<{
    productId: number
    thumbnailImageId: number
    name: string
    quantity: number
    unitPrice: number
    favorCount: number
    isFavor: Boolean
  }>
>([])

const getItemList = async () => {
  try {
    let data = await AxiosInstance.get('/api/product-service/products/search?page=1&size=8')
    itemList.value = data.data?.contents

    console.log(itemList.value)
  } catch (err: any) {
    console.log(err)
    error('데이터를 불러오는 도중 오류가 발생했습니다')
  }
}

const clickHeart = async (productId: number, isFavor: Boolean) => {
  try {
    if (isFavor) {
      let data = await AxiosInstance.delete(`/api/product-service/products/${productId}/favorite`)
    } else {
      let data = await AxiosInstance.post(`/api/product-service/products/${productId}/favorite`)
    }
    getItemList()
  } catch (err: any) {
    router.go(0)
    error(err.response.data.message)
    console.log(err)
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
            :src="`/api/product-service/products/images/${item.thumbnailImageId}`"
            @click="
              $router.push({
                path: 'item',
                query: {
                  id: item.productId
                }
              })
            "
          />
          <div class="homeitems_rank">{{ index + 1 }}</div>
          <div class="homeitems_title">{{ item.name }}</div>
          <div class="homeitems_price">{{ item.unitPrice.toLocaleString() }}</div>
          <div class="homeitems_review">리뷰 {{ 0 }}건</div>
          <div class="homeitems_heart" @click="clickHeart(item.productId, item.isFavor)">
            <img v-if="item.isFavor" src="@/assets/images/header/heartFill.png" />
            <img v-else src="@/assets/images/header/heart.png" />
            <div>{{ item.favorCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./HomeItems.scss');
</style>
