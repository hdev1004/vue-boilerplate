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
          :class="`mypage_menu ${menuType === '회원탈퇴' ? 'mypage_menu_active' : ''}`"
          @click="menuType = '회원탈퇴'"
        >
          회원탈퇴
        </div>
      </div>

      <div class="register_table" v-if="menuType === '정보수정'">
        <div class="register_row">
          <div>아이디 <span>*</span></div>
          <div class="register_input">
            <input
              disabled="true"
              spellcheck="false"
              :class="errorType === '아이디' ? 'input_error' : ''"
              v-model="loginId"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div class="register_sub">아이디를 입력해 주세요. (영문소문자/숫자, 4~16자).</div>
        </div>

        <div class="register_row">
          <div>비밀번호 <span>*</span></div>
          <div class="register_input">
            <input
              type="password"
              :class="errorType === '비밀번호' ? 'input_error' : ''"
              v-model="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="register_sub">(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)</div>
        </div>

        <div class="register_row">
          <div>비밀번호 확인 <span>*</span></div>
          <div class="register_input">
            <input
              type="password"
              :class="errorType === '비밀번호확인' ? 'input_error' : ''"
              v-model="rePassword"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div class="register_sub"></div>
        </div>

        <div class="register_row">
          <div>이름 <span>*</span></div>
          <div class="register_input">
            <input
              spellcheck="false"
              :class="errorType === '사용자이름' ? 'input_error' : ''"
              v-model="memberName"
              placeholder="이름을 입력하세요"
            />
          </div>
          <div class="register_sub"></div>
        </div>
        <div class="register_btn" @click="updateCheck">수정하기</div>
      </div>
      <div v-if="menuType === '회원탈퇴'" class="delete_container">
        <div>정말로 탈퇴하시겠습니까? 🥹</div>
        <div>탈퇴 시 정보가 삭제 됩니다.</div>

        <div class="delete_btn" @click="withdraw">회원탈퇴</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./mypage.scss');
</style>
