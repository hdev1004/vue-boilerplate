<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error } from '@/utils/vueAlert'
import type { SelectProps } from 'ant-design-vue'
import Cookies from 'js-cookie'

const deliverUserInfo = ref('1')
const route = useRoute()
const carts = ref<Array<any>>([])
const totalPrice = ref(0)
const memberString = Cookies.get('member')
const memberInfo = memberString ? JSON.parse(memberString) : {}

console.log(memberInfo)

const name = ref(memberInfo.memberName)
const address = ref(memberInfo.address)
const addressDetail = ref(memberInfo.addressDetail)
const emailId = ref(memberInfo.email.split('@')[0])
const emailDomain = ref(memberInfo.email.split('@')[1])
const phone = ref(memberInfo.phoneNumber)
const phone1 = ref('010')
const phone2 = ref('')
const phone3 = ref('')
const postCode = ref(memberInfo.postNumber)

const delivery_name = ref(memberInfo.name)
const delivery_address = ref(memberInfo.address)
const delivery_addressDetail = ref(memberInfo.addressDetail)
const delivery_postCode = ref(memberInfo.postNumber)
const delivery_phone = ref(memberInfo.phoneNumber)
const delivery_phone1 = ref('010')
const delivery_phone2 = ref('')
const delivery_phone3 = ref('')

const wallet = ref(0)

const load = () => {
  splitPhoneNumber()
  getWallet()
}

delivery_name.value = name.value
delivery_address.value = address.value
delivery_addressDetail.value = addressDetail.value
delivery_postCode.value = postCode.value
delivery_phone1.value = phone1.value
delivery_phone2.value = phone2.value
delivery_phone3.value = phone3.value

let tempCarts = Cookies.get('carts')
if (tempCarts === undefined) {
  alert('정상적이지 않은 접근입니다.')
} else {
  carts.value = JSON.parse(tempCarts)
  carts.value.map((item) => {
    totalPrice.value += item.product.unitPrice * item.quantity
  })

  console.log(carts.value)
}

function splitPhoneNumber() {
  let phoneNumber = phone.value
  // 전화번호 정규 표현식
  const phonePattern = /^(\d{2,3})-?(\d{3,4})-?(\d{4})$/
  const match = phoneNumber.match(phonePattern)

  if (match) {
    // 배열의 첫 번째 요소는 전체 매칭된 문자열이므로 제외
    const [, part1, part2, part3] = match
    phone1.value = part1
    phone2.value = part2
    phone3.value = part3
  } else {
    error('올바른 전화번호가 아닙니다')
    return
  }
}

const getWallet = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/wallet')
    if (data === null) return
    wallet.value = data.data.amount
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다.')
  }
}

const payment = async () => {
  if (wallet.value < totalPrice.value) {
    //충전이 필요한 경우
    try {
      let data = await AxiosInstance.post('/api/order-service/wallet', {
        amount: totalPrice.value - wallet.value
      })
      if (data === null) return

      return
      let pay = await AxiosInstance.post('/api/order-service/orders', {
        senderName: delivery_name.value,
        senderPhoneNumber: '0105213456',
        senderEmail: 'woongd@dsakl',

        receiverName: 'receiver',
        receiverPhoneNumber: '0105634574341',

        address: 'addr',
        addressDetail: 'detail',

        orderProducts: [
          {
            productId: '1',
            quantity: '10',
            memberCouponId: '1'
          },
          {
            productId: '2',
            quantity: '4'
          }
        ]
      })
    } catch (err: any) {
      console.log(err)
      error('오류가 발생했습니다.')
    }
  }
  return
}

const options = ref<SelectProps['options']>([
  {
    value: '010',
    label: '010'
  },
  {
    value: '011',
    label: '011'
  },
  {
    value: '016',
    label: '016'
  },
  {
    value: '017',
    label: '017'
  },
  {
    value: '018',
    label: '018'
  },
  {
    value: '019',
    label: '019'
  }
])

const findAddress = () => {
  new window.daum.Postcode({
    oncomplete: function (data: any) {
      console.log(data)
      delivery_address.value = data.address
      delivery_postCode.value = data.zonecode
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
  }).open()
}

const changeRadio = (e: any) => {
  let radio = e.target.value
  if (radio == 1) {
    console.log('here')
    //주문자 정보와 동일
    delivery_name.value = name.value
    delivery_address.value = address.value
    delivery_addressDetail.value = addressDetail.value
    delivery_postCode.value = postCode.value
    delivery_phone1.value = phone1.value
    delivery_phone2.value = phone2.value
    delivery_phone3.value = phone3.value
  } else {
    delivery_name.value = ''
    delivery_address.value = ''
    delivery_addressDetail.value = ''
    delivery_postCode.value = ''
    delivery_phone1.value = ''
    delivery_phone2.value = ''
    delivery_phone3.value = ''
  }
}

load()
onMounted(() => {
  const script = document.createElement('script') //script 변수 선언해서 <scrpit /> 얘를 만들어가지고 담는다
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' //script의 src속성에 카카오에서 제공한 주소값을 넣어준다
  document.head.appendChild(script) //head에 src 속성까지 만들어진 script소스를   append한다
})
</script>

<template>
  <section class="payment_container">
    <div class="payment_logo">결제</div>
    <div class="payment_body">
      <div class="payment_card">
        <div class="payment_title">주문자 정보</div>
        <div class="payment_order">
          <div class="payment_order_row">
            <div class="payment_order_row_title">주문자 *</div>
            <input v-model="name" />
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">휴대전화 *</div>
            <a-select
              :options="options"
              class="payment_phone_select"
              size="large"
              v-model:value="phone1"
            ></a-select>
            <div class="div">-</div>
            <input type="number" v-model="phone2" />
            <div class="div">-</div>
            <input type="number" v-model="phone3" />
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">이메일</div>
            <input v-model="emailId" />
            <div class="div">@</div>
            <input v-model="emailDomain" />
          </div>
        </div>
      </div>

      <div class="payment_line"></div>

      <div class="payment_card">
        <div class="payment_title">배송지</div>
        <div class="payment_order_select">
          <a-radio-group v-model:value="deliverUserInfo" name="radioGroup" @change="changeRadio">
            <a-radio value="1">주문자 정보와 동일</a-radio>
            <a-radio value="2">새로운 배송지</a-radio>
          </a-radio-group>
        </div>
        <div class="payment_order">
          <div class="payment_order_row">
            <div class="payment_order_row_title">받는사람 *</div>
            <input v-model="delivery_name" />
          </div>
          <div class="payment_order_row" style="height: auto !important; line-height: normal">
            <div class="payment_order_row_title">주소 *</div>
            <div class="payment_order_address">
              <div class="payment_order_addres_search">
                <input disabled placeholder="우편번호" v-model="delivery_postCode" />
                <div @click="findAddress">주소검색</div>
              </div>
              <input placeholder="기본주소" disabled v-model="delivery_address" />
              <input placeholder="상세주소" v-model="delivery_addressDetail" />
            </div>
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">휴대전화 *</div>
            <a-select
              v-model:value="delivery_phone1"
              :options="options"
              class="payment_phone_select"
              size="large"
            ></a-select>
            <div class="div">-</div>
            <input type="number" v-model="delivery_phone2" />
            <div class="div">-</div>
            <input type="number" v-model="delivery_phone3" />
          </div>
        </div>
      </div>
      <div class="payment_line"></div>

      <div class="payment_card">
        <div class="payment_title">주문상품</div>
        <div class="payment_items">
          <div class="payment_item" v-for="(cart, index) in carts" v-bind:key="`item${index}`">
            <img
              class="payment_item_image"
              :src="`/api/product-service/products/images/${cart.product.thumbnailImageId}`"
            />
            <div class="payment_item_contents">
              <div class="payment_item_title">{{ cart.product.name }}</div>
              <div class="payment_item_quantity">수량 : {{ cart.quantity }}개</div>
              <div class="payment_item_price">
                {{ (cart.product.unitPrice * cart.quantity).toLocaleString() }} 원
              </div>
              <div class="payment_item_close">
                <img src="@/assets/images/header/closeWhite.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="payment_last" @click="payment">
        <div>{{ totalPrice.toLocaleString() }} 원 결제하기</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./payment.scss');
</style>
