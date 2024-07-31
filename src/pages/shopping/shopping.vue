<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'
import type { SelectProps } from 'ant-design-vue'
import Cookies from 'js-cookie'
let itemList = ref<Array<any>>([])
let items = ref<{
  [key: string]: boolean
}>({})
const sum = ref(0)
const quantity = ref<Array<number>>([])
const paymentBody = ref<Array<any>>([])
const router = useRouter()
const couponList = ref<Array<any>>([]) //전체 쿠폰 리스트 목록
const useCoupon = ref<Array<any>>([]) //각 항목마다 뭘 사용하고 있는지 확인하는 변수
const prevCouponList = ref<Array<any>>([])
const deductionPrice = ref<Array<any>>([]) //공제금액

const options = ref<any['options']>([])

/**
 *
 * @param value 변경된 값
 * @param index 변경된 상품의 인덱스
 */
const handleChange = (value: any, index: number) => {
  let prev = prevCouponList.value[index] //이전 데이터
  selecedCouponId(value, prev, index)
  prevCouponList.value[index] = value
  console.log(value, index)
}

const selecedCouponId = (couponId: number, prevCouponId: any, itemIdx: number) => {
  for (let i = 0; i < options.value?.length; i++) {
    if (couponId !== null && options.value[i].value === couponId) {
      options.value[i].disabled = true
      if (options.value[i].isPercent) {
        console.log('공제 : ', options.value[i].discount + '%')
        deductionPrice.value[itemIdx] =
          itemList.value[itemIdx].product.unitPrice *
          quantity.value[itemIdx] *
          (options.value[i].discount / 100)
      } else {
        deductionPrice.value[itemIdx] = options.value[i].discount
      }
      console.log(deductionPrice.value)
    }
    if (prevCouponId !== null && options.value[i].value === prevCouponId) {
      options.value[i].disabled = false
    }
  }
  console.log(options.value)
}

const getCouponList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/members/coupon')
    if (data === null) return
    couponList.value = data.data.coupons
    options.value?.push({
      label: '미사용',
      value: null
    })
    for (let i = 0; i < couponList.value.length; i++) {
      if (couponList.value[i].isUsed) continue
      options.value?.push({
        label: couponList.value[i].name,
        value: couponList.value[i].couponId,
        discount: couponList.value[i].discount,
        isPercent: couponList.value[i].isPercent
      })
    }
    console.log('COUPON LIST : ', options.value)
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다')
  }
}

const getItemList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/carts')
    if (data === null) return

    itemList.value = data.data.carts
    itemList.value.forEach((element) => {
      quantity.value.push(element.quantity)
      useCoupon.value.push(null)
      prevCouponList.value.push(null)
      deductionPrice.value.push(0)
    })
  } catch (err: any) {
    error('데이터를 불러오는 중 오류가 발생했습니다.')
    console.log(err)
  }
}

const itemMiuse = (index: number) => {
  if (quantity.value[index] > 1) {
    quantity.value[index] -= 1
    for (let i = 0; i < options.value.length; i++) {
      if (useCoupon.value[index] !== null && options.value[i].value === useCoupon.value[index]) {
        if (options.value[i].isPercent) {
          deductionPrice.value[index] =
            itemList.value[index].product.unitPrice *
            quantity.value[index] *
            (options.value[i].discount / 100)
        } else {
          deductionPrice.value[index] = options.value[i].discount
        }
      }
    }
    console.log('공제금 : ', deductionPrice.value)

    sum.value = 0
    itemList.value.forEach((element) => {
      sum.value += element.product.unitPrice * quantity.value[index]
    })
  }
}

const itemPlus = (index: number) => {
  if (quantity.value[index] < 101) {
    quantity.value[index] += 1
    for (let i = 0; i < options.value.length; i++) {
      if (useCoupon.value[index] !== null && options.value[i].value === useCoupon.value[index]) {
        if (options.value[i].isPercent) {
          deductionPrice.value[index] =
            itemList.value[index].product.unitPrice *
            quantity.value[index] *
            (options.value[i].discount / 100)
        } else {
          deductionPrice.value[index] = options.value[i].discount
        }
      }
    }
    console.log('공제금 : ', deductionPrice.value)

    sum.value = 0
    itemList.value.forEach((element, idx) => {
      sum.value += element.product.unitPrice * quantity.value[idx]
    })
  }
}

const sumDeductionPrice = () => {
  let sum = 0

  deductionPrice.value.forEach((element) => {
    sum += element
  })

  return sum
}

const entireItemClick = () => {
  if (itemList.value.length === Object.keys(items.value).length) {
    items.value = {}
  } else {
    itemList.value.forEach((element) => {
      items.value[element.cartId] = element
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
  let cartsId = Object.keys(items.value)
  if (cartsId.length === 0) {
    warning('상품을 선택해주세요')
    return
  }
  paymentBody.value = []
  for (let i = 0; i < itemList.value.length; i++) {
    //여기서부터 수정
    console.log(String(itemList.value[i].cartId), cartsId)
    if (cartsId.includes(String(itemList.value[i].cartId))) {
      let params = {
        cartId: itemList.value[i].cartId,
        quantity: quantity.value[i],
        product: itemList.value[i].product,
        coupon: useCoupon.value[i],
        discount: deductionPrice.value[i]
      }
      paymentBody.value.push(params)
    }
  }

  Cookies.set('carts', JSON.stringify(paymentBody.value), {
    expires: 1
  })
  router.push({ name: 'payment' })
}

const allOrder = () => {
  paymentBody.value = []
  for (let i = 0; i < itemList.value.length; i++) {
    let params = {
      cartId: itemList.value[i].cartId,
      quantity: quantity.value[i],
      product: itemList.value[i].product,
      coupon: useCoupon.value[i],
      discount: deductionPrice.value[i]
    }
    paymentBody.value.push(params)
  }

  Cookies.set('carts', JSON.stringify(paymentBody.value), {
    expires: 1
  })
  router.push({ name: 'payment' })
}

const itemCheckbox = (cartId: string, item: any) => {
  if (items.value[cartId]) {
    delete items.value[cartId]
  } else {
    items.value[cartId] = item
  }
}

getItemList()
getCouponList()
</script>

<template>
  <section class="shopping_container">
    <div class="shopping_logo">장바구니</div>
    <div class="item_card_container">
      <div v-if="itemList.length === 0">
        <div>장바구니에 담긴 상품이 없습니다. 🛒</div>
      </div>
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
            <div class="item_price">
              {{ (item.product.unitPrice * quantity[index]).toLocaleString() }}원
            </div>
            <div class="item_quantity">
              <div class="item_minus" @click="itemMiuse(index)">-</div>
              <div class="item_number">{{ quantity[index] }}</div>
              <div class="item_plus" @click="itemPlus(index)">+</div>
            </div>

            <div class="item_coupon">
              <a-select
                ref="select"
                v-model:value="useCoupon[index]"
                style="width: 120px"
                :options="options"
                @change="(e:any) => handleChange(e, index )"
              ></a-select>
            </div>
          </div>
          <div class="item_delete" @click="itemDelete(item)">
            <img src="@/assets/images/header/closeWhite.png" />
          </div>
          <a-checkbox
            class="item_checkbox"
            :checked="items[item.cartId]"
            @change="itemCheckbox(item.cartId, item)"
          ></a-checkbox>
        </div>
      </div>
    </div>

    <div class="item_batch_btn">
      <div @click="entireItemClick">전체선택</div>
      <div @click="selectDelete">선택삭제</div>
    </div>

    <div class="item_cashier">
      <div>상품금액</div>
      <div>{{ sum.toLocaleString() }}원</div>
    </div>
    <div class="item_cashier">
      <div>할인금액</div>
      <div>{{ sumDeductionPrice().toLocaleString() }}원</div>
    </div>

    <div class="item_cashier">
      <div>결제금액</div>
      <div>{{ (sum - sumDeductionPrice()).toLocaleString() }}원</div>
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
