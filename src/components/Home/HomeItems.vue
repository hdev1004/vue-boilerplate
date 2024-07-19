<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  /**Modal 여부 */
  //tab : 'best', 'new', 'category'
  title: String,
  tab: String,
  infinity: Boolean
})
const styles = ref<Array<any>>([])
const loading = ref(false)
const stylesSelect = ref(0)

watch(
  () => route.query.style,
  () => {
    getItemList()
  }
)

let itemList = ref<
  Array<{
    productId: number
    thumbnailImageId: number
    name: string
    quantity: number
    unitPrice: number
    favorCount: number
    inquireCount: number
    isFavor: Boolean
  }>
>([])

const categoryChange = (index: number) => {
  stylesSelect.value = index
  router.push(`/category?style=${styles.value[index].style}`)
}

const getItemList = async () => {
  loading.value = true
  try {
    //스타일 받기
    let styleData = await AxiosInstance.get('/api/product-service/products/styles/most')
    styles.value = styleData.data.styles
    console.log('STYLES : ', styles.value)

    let style = route.query?.style
    if (style === undefined) {
      console.log(styles.value)
      style = styles.value[0].style
    }

    //데이터 리스트 받기
    let data = null
    if (props.tab === 'best') {
      data = await AxiosInstance.get('/api/product-service/products/search?page=1&size=8')
    } else if (props.tab === 'new') {
      data = await AxiosInstance.get(
        '/api/product-service/products/search?page=1&size=8&sortElement=createdAt'
      )
    } else if (props.tab === 'category') {
      data = await AxiosInstance.get(
        `/api/product-service/products/search?page=1&size=8&style=${style}`
      )
    }
    if (data === null) return
    itemList.value = data.data?.contents
    loading.value = false

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
      if (data === null) return
    } else {
      let data = await AxiosInstance.post(`/api/product-service/products/${productId}/favorite`)
      if (data === null) return
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
  <a-spin :spinning="loading" tip="loading" style="margin-top: 200px">
    <section class="homeitems_container">
      <div class="homeitems_logo">{{ props.title }}</div>

      <div v-if="props.tab === 'category'" class="homeitems_styles">
        <div
          v-for="(item, index) in styles"
          v-bind:key="`item${index}`"
          :class="`homeitems_styles_item ${
            stylesSelect === index ? 'homeitems_styles_item_select' : ''
          }`"
          @click="categoryChange(index)"
        >
          {{ item.style }}
        </div>
      </div>
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
            <div class="homeitems_review">문의 {{ item.inquireCount }}건</div>
            <div class="homeitems_heart" @click="clickHeart(item.productId, item.isFavor)">
              <img v-if="item.isFavor" src="@/assets/images/header/heartFill.png" />
              <img v-else src="@/assets/images/header/heart.png" />
              <div>{{ item.favorCount }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </a-spin>
</template>

<style lang="scss" scoped>
@import url('./HomeItems.scss');
</style>
