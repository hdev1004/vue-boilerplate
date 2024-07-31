<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import { error, success, warning } from '@/utils/vueAlert'
import emailjs from 'emailjs-com'

const email = ref('')
const findId = ref<any>('')
const loading = ref(false)
const fromName = ref('글루따띠온 관리자')
const responseMessage = ref('')
const otp = ref(0)
const isExpire = ref(false)
const SERVICE = import.meta.env.VITE_API_SERVICE
const TEMPLATE = import.meta.env.VITE_API_TEMPLATE
const USER = import.meta.env.VITE_API_USER
const isSending = ref(false) //인증메일 전송 여부
const vertifyNumber = ref('')

const timeout = ref<any>(null)
function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000)
}

const sendEmail = async () => {
  if (timeout.value !== null) {
    //기존에 진행한게 있다면 취소
    clearTimeout(timeout.value)
  }
  //3분
  timeout.value = setTimeout(() => {
    isExpire.value = true
  }, 180000)
  otp.value = generateRandomSixDigitNumber()

  try {
    const templateParams = {
      number: otp.value,
      to_email: email.value,
      to_name: fromName.value
    }

    await emailjs.send(
      SERVICE, // EmailJS에서 제공하는 서비스 ID
      TEMPLATE, // EmailJS에서 제공하는 템플릿 ID
      templateParams,
      USER
    )

    isExpire.value = false
    isSending.value = true
    console.log('sending')
    success('이메일이 전송되었습니다.')
    warning('인증번호 유효시간은 3분 입니다.')
    responseMessage.value = 'Email sent successfully!'
  } catch (error: any) {
    console.log('err', error)
    responseMessage.value = 'Failed to send email: ' + error.text
  }
}

const findIdClick = async () => {
  if (isExpire.value) {
    warning('인증번호가 만료되었습니다.')
    return
  }
  if (parseInt(vertifyNumber.value) !== otp.value) {
    warning('인증번호가 같지 않습니다')
    return
  }

  try {
    let data = await AxiosInstance.get(`/api/user-service/members/loginId?email=${email.value}`)
    if (data === null) return
    findId.value = data.data.loginId
  } catch (err: any) {
    console.log(err)
    error('오류가 발생했습니다.')
    return
  }

  //loading.value = true
}
</script>

<template>
  <a-spin :spinning="loading">
    <section class="login_container">
      <div class="login_title_container">
        <div class="logo">글루따띠온</div>
        <div class="sub">아이디 찾기</div>
        <div class="sub">이메일을 입력해주세요</div>
      </div>

      <div class="login_line"></div>

      <div class="input_container">
        <input placeholder="이메일" v-model="email" />
        <div class="sending_btn" @click="sendEmail">전송하기</div>
      </div>

      <div style="margin-top: 10px"></div>

      <div class="input_container" v-if="isSending">
        <input placeholder="인증번호" v-model="vertifyNumber" />
      </div>

      <div v-if="findId !== '' && findId !== null" class="find_id">
        <div>아이디를 찾았습니다</div>
        <div>아이디 : {{ findId }}</div>
      </div>
      <div class="login_btn" @click="findIdClick">아이디 찾기</div>
      <div class="button_container">
        <div class="btn_txt" @click="$router.push('/findPw')">비밀번호 찾기</div>
        <div class="btn_line"></div>
        <div class="btn_txt" @click="$router.push('/register')">회원가입</div>
      </div>
    </section></a-spin
  >
</template>

<style lang="scss" scoped>
@import url('../login/login.scss');
@import url('./findId.scss');
</style>
