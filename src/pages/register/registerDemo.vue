<script setup lang="ts">
import RegisterModal from './registerModal.vue'
import axiosInstance from '@/axios/axiosInstance'
import { message } from 'ant-design-vue'

const isModal = ref(false)
const loginId = ref('')
const password = ref('')
const rePassword = ref('')
const memberName = ref('')
const errorType = ref('none')
const type = ref('회원가입') //회원가입, 오류 2개의 타입
const title = ref('회원가입을 진행하시겠습니까?')
const sub = ref('회원정보는 가입 후 변경할 수 있습니다.')
const router = useRouter()

const success = () => {
  message.success('회원가입이 완료되었습니다.')
}
const error = () => {
  message.error('회원가입도중 오류가 발생했습니다.')
}
const warning = () => {
  message.warning('This is a warning message')
}

//회원가입 함수
const register = async () => {}

const close = () => {
  isModal.value = false
}
</script>

<template>
  <section class="register">
    <div class="title">회원가입</div>

    <div class="table_scription"><span>*</span> 필수입력사항</div>
    <div class="register_table">
      <div class="register_row">
        <div>아이디 <span>*</span></div>
        <div class="register_input">
          <input
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
    </div>

    <div class="register_btn">회원가입</div>
  </section>

  <section>
    <RegisterModal
      :isModal="isModal"
      :type="type"
      :title="title"
      :sub="sub"
      :action="register"
      :close="close"
    />
  </section>
</template>

<style lang="scss" scoped>
@import url('./register.scss');
</style>
