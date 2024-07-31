<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'
import type { SelectProps } from 'ant-design-vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

const isModal = ref(false)
const memberString = Cookies.get('member')
const memberInfo = memberString ? JSON.parse(memberString) : {}
const loginId = ref(memberInfo.loginId)
const password = ref('')
const rePassword = ref('')
const memberName = ref(memberInfo.memberName)
const errorType = ref('none')
const postCode = ref(memberInfo.postNumber)
const address = ref(memberInfo.address)
const address_detail = ref(memberInfo.addressDetail)
const email_id = ref(memberInfo.email.split('@')[0])
const email_domain = ref(memberInfo.email.split('@')[1])
const myOrders = ref<Array<any>>([])
const couponList = ref<Array<any>>([])

const phone = ref(memberInfo.phoneNumber)
const phone1 = ref('')
const phone2 = ref('')
const phone3 = ref('')

const menuType = ref('정보수정')

const router = useRouter()

console.log(memberInfo)

splitPhoneNumber()

const getCouponList = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/members/coupon')
    if (data === null) return

    couponList.value = data.data.coupons
    console.log(data)
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다')
  }
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

onMounted(() => {
  const script = document.createElement('script') //script 변수 선언해서 <scrpit /> 얘를 만들어가지고 담는다
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' //script의 src속성에 카카오에서 제공한 주소값을 넣어준다
  document.head.appendChild(script) //head에 src 속성까지 만들어진 script소스를   append한다
})

const getMyOrders = async () => {
  try {
    let data = await AxiosInstance.get('/api/order-service/members/orders')
    if (data === null) return
    console.log(data.data.orders)
    myOrders.value = data.data.orders
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다.')
  }
}

getMyOrders()
getCouponList()

//전화번호 나누기
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

function formatDateTime(dateTimeString: string) {
  const dateTime = new Date(dateTimeString)

  const formattedDate = dateTime.toISOString().split('T')[0]
  const formattedTime = dateTime.toTimeString().split(' ')[0].substring(0, 5)

  return `${formattedDate} ${formattedTime}`
}

const findAddress = () => {
  new window.daum.Postcode({
    oncomplete: function (data: any) {
      console.log(data)
      address.value = data.address
      postCode.value = data.zonecode
      address_detail.value = ''
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
  }).open()
}

const withdraw = async () => {
  if (confirm('회원을 탈퇴하시겠습니까? 🥹')) {
    let data = null
    try {
      data = await AxiosInstance.delete(`/api/user-service/members/${memberInfo.memberId}`)
      if (data === null) return
      console.log(data)

      success('회원 탈퇴가 완료되었습니다.')
      success('그동안 이용해주셔서 감사합니다. 🤗')

      window.localStorage.removeItem('memberToken')
      Cookies.remove('member')
      router.push('/')
    } catch (err) {
      console.log(err)
      error('회원 탈퇴 중 오류가 발생했습니다')
    }
  }
}

const updateCheck = async () => {
  if (password.value !== rePassword.value || (password.value === '' && rePassword.value === '')) {
    warning('비밀번호를 확인해주세요')
    return
  } else if (memberName.value.trim() === '') {
    warning('이름을 확인해주세요')
    return
  }
  if (phone1.value.trim() === '' || phone2.value === '' || phone3.value === '') {
    warning('전화번호를 확인해주세요.')
    return
  }

  if (email_id.value.trim() === '' || email_domain.value.trim() === '') {
    warning('이메일을 확인해주세요.')
    return
  }

  if (
    address.value.trim() === '' ||
    address_detail.value.trim() === '' ||
    postCode.value.trim() === ''
  ) {
    warning('배송지를 확인해주세요')
    return
  }

  let memberId = memberInfo.memberId
  try {
    let data = await AxiosInstance.put(`/api/user-service/members/${memberId}`, {
      password: password.value,
      memberName: memberName.value,
      phoneNumber: `${phone1.value}${phone2.value}${phone3.value}`,
      email: `${email_id.value}@${email_domain.value}`,
      postNumber: postCode.value,
      address: address.value,
      addressDetail: address_detail.value
    })

    let userInfo = await AxiosInstance.get(`/api/user-service/members/${memberId}`)
    userInfo = userInfo.data
    Cookies.set('member', JSON.stringify(userInfo), {
      expires: 1
    })
    if (data === null) return
    success('회원 정보가 변경되었습니다.')
  } catch (err) {
    error('회원 변경 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <section class="mypage_container">
    <div class="mypage_logo">마이페이지</div>
    <div class="mypage_description">
      {{ memberInfo.memberName }}님 글루따띠온을 이용해 주셔서 감사합니다.
    </div>

    <div class="mypage_menu_group">
      <div class="mypage_menu_tabs">
        <div
          :class="`mypage_menu ${menuType === '정보수정' ? 'mypage_menu_active' : ''}`"
          @click="menuType = '정보수정'"
        >
          정보수정
        </div>
        <div
          :class="`mypage_menu ${menuType === '결제내역' ? 'mypage_menu_active' : ''}`"
          @click="menuType = '결제내역'"
        >
          결제내역
        </div>
        <div
          :class="`mypage_menu ${menuType === '쿠폰리스트' ? 'mypage_menu_active' : ''}`"
          @click="menuType = '쿠폰리스트'"
        >
          쿠폰리스트
        </div>
      </div>

      <div class="register_table" v-if="menuType === '정보수정'">
        <div class="payment_body">
          <div class="payment_card">
            <div class="payment_title">회원 정보</div>
            <div class="payment_order">
              <div class="payment_order_row">
                <div class="payment_order_row_title">아이디 *</div>
                <input placeholder="아이디를 입력하세요" v-model="loginId" disabled />
              </div>

              <div class="payment_order_row">
                <div class="payment_order_row_title">비밀번호 *</div>
                <input placeholder="비밀번호를 입력하세요" type="password" v-model="password" />
              </div>

              <div class="payment_order_row">
                <div class="payment_order_row_title">비빌번호 확인 *</div>
                <input
                  placeholder="비밀번호를 다시 입력하세요"
                  type="password"
                  v-model="rePassword"
                />
              </div>
              <div class="payment_order_row">
                <div class="payment_order_row_title">성함 *</div>
                <input placeholder="성함을 입력하세요" v-model="memberName" />
              </div>
              <div class="payment_order_row">
                <div class="payment_order_row_title">휴대전화 *</div>
                <a-select
                  :options="options"
                  v-model:value="phone1"
                  class="payment_phone_select"
                  size="large"
                ></a-select>
                <div class="div">-</div>
                <input type="number" v-model="phone2" />
                <div class="div">-</div>
                <input type="number" v-model="phone3" />
              </div>
              <div class="payment_order_row">
                <div class="payment_order_row_title">이메일</div>
                <input v-model="email_id" />
                <div class="div">@</div>
                <input v-model="email_domain" />
              </div>
            </div>
          </div>

          <div class="payment_line"></div>

          <div class="payment_card">
            <div class="payment_title">배송지</div>
            <div class="payment_order_select"></div>
            <div class="payment_order">
              <div class="payment_order_row" style="height: auto !important; line-height: normal">
                <div class="payment_order_row_title">주소 *</div>
                <div class="payment_order_address">
                  <div class="payment_order_addres_search">
                    <input placeholder="우편번호" v-model="postCode" disabled />
                    <div @click="findAddress">주소검색</div>
                  </div>
                  <input placeholder="기본주소" v-model="address" disabled />
                  <input placeholder="상세주소" v-model="address_detail" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="register_btn" @click="updateCheck">수정하기</div>
        <div class="delete_btn" @click="withdraw">회원탈퇴</div>
      </div>

      <div class="register_table" v-if="menuType === '결제내역'">
        <div class="order_empty" v-if="myOrders.length === 0">주문한 상품이 없습니다. 🛒</div>
        <div
          v-for="(item, index) in myOrders"
          v-bind:key="`item${index}`"
          class="order_big_container"
        >
          <div class="order_container">
            <div class="order_username">배송자 : {{ item.senderName }}</div>
            <div class="order_sub_container">
              <div
                class="order_sub_item"
                v-for="(subItem, subIndex) in item.orderProducts"
                v-bind:key="`subItem${subIndex}`"
              >
                <div class="order_sub_image">
                  <img
                    :src="`/api/product-service/products/images/${subItem.productDetailResponseDto.thumbnailImageId}`"
                  />
                </div>
                <div class="order_column">
                  <div>
                    {{ subItem.productDetailResponseDto.name }}
                  </div>
                  <div>{{ formatDateTime(subItem.productDetailResponseDto.createdAt) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="register_table" v-if="menuType === '쿠폰리스트'">
        <div class="coupon_list_container">
          <div class="coupon_title">사용 가능 쿠폰</div>
          <div class="myCoupon_title">
            <div>사진</div>
            <div>쿠폰명</div>
            <div>할인금액</div>
          </div>
          <div
            v-if="couponList.filter((item) => item.isUsed === false).length === 0"
            class="poss_coupon"
          >
            사용가능한 쿠폰이 없습니다.
          </div>
          <div
            class="myCoupon"
            v-for="(coupon, index) in couponList.filter((item) => item.isUsed === false)"
            v-bind:key="`coupon${index}`"
          >
            <div class="coupon_image">
              <img :src="`/api/order-service/coupon/images/${coupon.couponImageId}`" />
            </div>
            <div>
              {{ coupon.name }}
            </div>

            <div>{{ coupon.discount.toLocaleString() }}{{ coupon.isPercent ? '%' : '원' }}</div>
          </div>

          <div class="coupon_line"></div>

          <div class="coupon_title">사용한 쿠폰</div>
          <div class="myCoupon_title">
            <div>사진</div>
            <div>쿠폰명</div>
            <div>할인금액</div>
          </div>
          <div
            v-if="couponList.filter((item) => item.isUsed === true).length === 0"
            class="poss_coupon"
          >
            사용한 쿠폰이 없습니다.
          </div>
          <div
            class="useCoupon"
            v-for="(coupon, index) in couponList.filter((item) => item.isUsed === true)"
            v-bind:key="`coupon${index}`"
          >
            <div class="coupon_image">
              <img :src="`/api/order-service/coupon/images/${coupon.couponImageId}`" />
            </div>
            <div>
              {{ coupon.name }}
            </div>

            <div>{{ coupon.discount.toLocaleString() }}{{ coupon.isPercent ? '%' : '원' }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./mypage.scss');
@import url('../payment/payment.scss');
</style>
