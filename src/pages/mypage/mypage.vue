<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'
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
const menuType = ref('정보수정')

const router = useRouter()

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

  let memberId = memberInfo.memberId
  try {
    let data = await AxiosInstance.put(`/api/user-service/members/${memberId}`, {
      password: password.value,
      memberName: memberName.value
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
                <a-select :options="options" class="payment_phone_select" size="large"></a-select>
                <div class="div">-</div>
                <input />
                <div class="div">-</div>
                <input />
              </div>
              <div class="payment_order_row">
                <div class="payment_order_row_title">이메일</div>
                <input />
                <div class="div">@</div>
                <input />
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
                    <input placeholder="우편번호" />
                    <div>주소검색</div>
                  </div>
                  <input placeholder="기본주소" />
                  <input placeholder="상세주소" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="register_btn" @click="updateCheck">수정하기</div>
        <div class="delete_btn" @click="withdraw">회원탈퇴</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./mypage.scss');
@import url('../payment/payment.scss');
</style>
