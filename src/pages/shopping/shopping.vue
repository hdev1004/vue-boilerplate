<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success } from '@/utils/vueAlert'
import type { SelectProps } from 'ant-design-vue'
let itemList = ref<Array<any>>([])
let items = ref<{
  [key: string]: boolean
}>({})
const sum = ref(0)
const quantity = ref<Array<number>>([])
const coupon = ref('')

const handleChange = (value: string) => {
  console.log(`selected ${value}`)
}

const getItemList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/carts')
    if (data === null) return

    itemList.value = data.data.carts
    itemList.value.forEach((element) => {
      quantity.value.push(element.quantity)
    })
  } catch (err: any) {
    error('데이터를 불러오는 중 오류가 발생했습니다.')
    console.log(err)
  }
}

getItemList()

const options = ref<SelectProps['options']>([
  {
    value: '',
    label: '쿠폰 리스트',
    disabled: true
  },
  {
    value: 'lucy',
    label: 'Lucy'
  },
  {
    value: 'disabled',
    label: 'Disabled'
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe'
  }
])

const itemMiuse = (index: number) => {
  if (quantity.value[index] > 1) {
    quantity.value[index] -= 1

    sum.value = 0
    itemList.value.forEach((element) => {
      sum.value += element.product.unitPrice * quantity.value[index]
    })
  }
}

const itemPlus = (index: number) => {
  if (quantity.value[index] < 101) {
    quantity.value[index] += 1

    sum.value = 0
    itemList.value.forEach((element, idx) => {
      sum.value += element.product.unitPrice * quantity.value[idx]
    })
  }
}

const entireItemClick = () => {
  if (itemList.value.length === Object.keys(items.value).length) {
    items.value = {}
  } else {
    itemList.value.forEach((element) => {
      items.value[element.cartId] = true
    })
  }
}

watch(
  () => itemList.value,
  () => {
    sum.value = 0
    itemList.value.forEach((element) => {
      sum.value += element.product.unitPrice * element.quantity
    })
  }
)

const itemDelete = async (item: any) => {
  if (window.confirm('선택한 상품을 삭제하시겠습니까?')) {
    try {
      let data = await AxiosInstance.delete(`/api/order-service/carts/${item.cartId}`)
      if (data === null) return

      success('선택한 상품이 삭제되었습니다.')
      getItemList()
    } catch (err: any) {
      error('오류가 발생했습니다.')
      console.log('err : ', err)
    }
  }
}

const selectDelete = async () => {
  let data = null
  if (window.confirm('선택한 상품들을 삭제하시겠습니까?')) {
    for (const item of Object.keys(items.value)) {
      try {
        const data = await AxiosInstance.delete(`/api/order-service/carts/${item}`)
        if (data === null) return

        // 성공적으로 삭제되었을 때 추가 작업이 있으면 여기서 처리
      } catch (err: any) {
        error('오류가 발생했습니다.')
        console.log('err : ', err)
      }
    }
    success('선택한 상품이 삭제되었습니다.')
    getItemList()
  }
}

const selectOrder = () => {
  alert('선택 상품 주문')
}

const allOrder = () => {
  alert('전체 상품 주문')
}

const itemCheckbox = (item: string) => {
  if (items.value[item]) {
    delete items.value[item]
  } else {
    items.value[item] = true
  }
}
</script>

<template>
  <section class="shopping_container">
    <div class="shopping_logo">장바구니</div>
    <div class="item_card_container">
      <div v-for="(item, index) in itemList" v-bind:key="item" class="item_card" :id="item">
        <div class="item_contents">
          <div class="item_images_container">
            <img
              class="item_image"
              :src="`/api/product-service/products/images/${item.product.thumbnailImageId}`"
            />
          </div>
          <div class="item_des">
            <div class="item_title">{{ item.product.name }}</div>
            <div class="item_price">{{ item.product.unitPrice.toLocaleString() }}원</div>
            <div class="item_quantity">
              <div class="item_minus" @click="itemMiuse(index)">-</div>
              <div class="item_number">{{ quantity[index] }}</div>
              <div class="item_plus" @click="itemPlus(index)">+</div>
            </div>

            <div class="item_coupon">
              <a-select
                ref="select"
                v-model:value="coupon"
                style="width: 120px"
                :options="options"
                @change="handleChange"
              ></a-select>
            </div>
          </div>
          <div class="item_delete" @click="itemDelete(item)">
            <img src="@/assets/images/header/closeWhite.png" />
          </div>
          <a-checkbox
            class="item_checkbox"
            :checked="items[item.cartId]"
            @change="itemCheckbox(item.cartId)"
          ></a-checkbox>
        </div>
      </div>
    </div>

    <div class="item_batch_btn">
      <div @click="entireItemClick">전체선택</div>
      <div @click="selectDelete">선택삭제</div>
    </div>

    <div class="item_cashier">
      <div>총 상품금액</div>
      <div>{{ sum.toLocaleString() }}원</div>
    </div>

    <div class="item_cashier_container">
      <div @click="selectOrder">선택상품주문</div>
      <div @click="allOrder">전체상품주문</div>
    </div>
  </section>
</template>

<style lang="scss">
@import url('./shopping.scss');

.item_checkbox .ant-checkbox {
  transform: scale(1.5);
}
</style>
