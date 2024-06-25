<script setup lang="ts">
import AxiosInstance from '@/axios/axiosInstance'
import axios from 'axios'

const id = ref('')
const pw = ref('')

const router = useRouter()

const login = async () => {
  let data = await axios.post('/api/user-service/login', {
    loginId: id.value,
    password: pw.value
  })
  console.log(data.headers.token)
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
      <input placeholder="아이디" v-model="id" />
      <input placeholder="비밀번호" v-model="pw" />
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
