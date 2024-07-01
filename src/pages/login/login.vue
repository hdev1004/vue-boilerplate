<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import Cookies from 'js-cookie'
import axios from 'axios'
import { success, error, warning } from '@/utils/vueAlert'
import { jwtDecode } from 'jwt-decode'

const id = ref('')
const pw = ref('')

const router = useRouter()
const cookieValue = ref('')
const decodedToken = ref(null)

const keyInput = (e) => {
  if (e.key === 'Enter') {
    console.log('LOGIN')
    login()
  }
}

const decodeToken = (token: string) => {
  let decodeToken = null

  try {
    decodeToken = jwtDecode(token)
    console.log(decodeToken)
  } catch (error) {
    decodeToken = 'Invalid Token'
  }
  return decodeToken
}

const setWithExpire = (memberToken: string, exp: number) => {
  let now = new Date()
  const item = {
    memberToken: memberToken,
    expires: now.getTime() + exp * 60 * 1000 * 1000
  }
  localStorage.setItem('memberToken', JSON.stringify(item))
}

const login = async () => {
  let data = null
  try {
    data = await AxiosInstance.post('/api/user-service/login', {
      loginId: id.value,
      password: pw.value
    })
    console.log('DATA : ', data)
    const token = data.headers.token
    setWithExpire(token, 5)
    let memberSub = decodeToken(token).sub

    let memberInfo = null

    try {
      memberInfo = await AxiosInstance.get(`/api/user-service/members/${memberSub}`)
      success(`${memberInfo.data.memberName} 님 안녕하세요. 🤗`)
    } catch (err) {
      error('오류가 발생했습니다.')
      console.log(err)
    }

    if (memberInfo === null) return

    Cookies.set('member', JSON.stringify(memberInfo.data), { expires: 1 }) // 7일 동안 유효한 쿠키 설정

    router.push('/')
  } catch (err) {
    warning('아이디 비빌번호를 확인해주세요.')
    console.log(err)
  }
}
</script>

<template>
  <section class="login_container">
    <div class="login_title_container">
      <div class="logo">글루따띠온</div>
      <div class="sub">쉽고 빠르게 로그인!</div>
      <div class="sub">회원 가입하고 많은 혜택 받아가세요 🌟</div>
    </div>

    <div class="login_line"></div>

    <div class="input_container">
      <input placeholder="아이디" v-model="id" :onkeypress="keyInput" />
      <input placeholder="비밀번호" v-model="pw" type="password" :onkeypress="keyInput" />
    </div>

    <div class="login_btn" @click="login">로그인</div>
    <div class="button_container">
      <div class="btn_txt">아이디 찾기</div>
      <div class="btn_line"></div>
      <div class="btn_txt">비밀번호 찾기</div>
      <div class="btn_line"></div>
      <div class="btn_txt" @click="router.push('/register')">회원가입</div>
    </div>
  </section>
</template>

<style>
@import url('./login.scss');
</style>
