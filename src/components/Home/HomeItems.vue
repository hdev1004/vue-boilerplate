<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'

const router = useRouter()
const route = useRoute()

const isDataLoading = ref(false) //추가 데이터 로딩 여부
const props = defineProps({
  /**Modal 여부 */
  //tab : 'best', 'new', 'category'
  title: String,
  tab: String,
  infinity: Boolean
})

const isEnd = ref(false)
const currentPage = ref(2)
const styles = ref<Array<any>>([])
const loading = ref(false)
const stylesSelect = ref(route.query.style)
console.log('PATH : ', route.query)

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

const categoryChange = (value: string, index: number) => {
  stylesSelect.value = value
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
      data = await AxiosInstance.get('/api/product-service/products/orders/top')
      let prodcuts = []
      for (let i = 0; i < data.data.products.length; i++) {
        prodcuts.push(data.data.products[i].product)
      }

      itemList.value = prodcuts
    } else if (props.tab === 'new') {
      data = await AxiosInstance.get(
        '/api/product-service/products/search?page=1&size=8&sortElement=createdAt'
      )

      itemList.value = data.data?.contents
    } else if (props.tab === 'category') {
      data = await AxiosInstance.get(
        `/api/product-service/products/search?page=1&size=8&style=${style}`
      )

      itemList.value = data.data?.contents
    }
    if (data === null) return
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

const addItemList = async () => {
  let data = null
  if (isEnd.value) return
  isDataLoading.value = true
  try {
    if (props.tab === 'new') {
      data = await AxiosInstance.get(
        `/api/product-service/products/search?page=${currentPage.value}&size=8&sortElement=createdAt`
      )
      itemList.value.push(...data.data.contents)

      if (data.data.contents.length > 0) currentPage.value += 1
      else isEnd.value = true
    } else if (props.tab === 'category') {
      data = await AxiosInstance.get(
        `/api/product-service/products/search?page=${currentPage.value}&size=8&style=1`
      )
      itemList.value.push(...data.data.contents)
      if (data.data.contents.length > 0) currentPage.value += 1
      else isEnd.value = true
    }
    isDataLoading.value = false
  } catch (err: any) {
    console.log('err : ', err)
    error('오류가 발생했습니다.')
  }
}

getItemList()
//무한 스크롤
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !isDataLoading.value) {
    if (route.path !== '/') addItemList()
  }
})
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
            stylesSelect === item.style ? 'homeitems_styles_item_select' : ''
          }`"
          @click="categoryChange(item.style, index)"
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
      <a-spin :spinning="isDataLoading" class="data_loading"></a-spin>
    </section>
  </a-spin>
</template>

<style lang="scss" scoped>
@import url('./HomeItems.scss');
</style>
