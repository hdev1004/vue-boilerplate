<script setup lang="ts">
import { error, success, warning } from '@/utils/vueAlert'
import RegisterModal from './registerModal.vue'
import axiosInstance from '@/axios/axiosInstance'

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

const registerCheck = () => {
  isModal.value = true
  if (loginId.value.trim() === '') {
    errorType.value = '아이디'
    type.value = '오류'
    title.value = '아이디를 입력해주세요.'
    sub.value = ''
    return
  }

  if (password.value.trim() === '') {
    errorType.value = '비밀번호'
    type.value = '오류'
    title.value = '비빌번호를 입력해주세요.'
    sub.value = ''
    return
  }

  if (password.value !== rePassword.value) {
    errorType.value = '비밀번호확인'
    type.value = '오류'
    title.value = '비밀번호가 같지 않습니다.'
    sub.value = ''
    return
  }

  if (memberName.value.trim() === '') {
    errorType.value = '사용자이름'
    type.value = '오류'
    title.value = '사용자 이름을 입력해주세요.'
    sub.value = ''
    return
  }
  errorType.value = 'none'

  type.value = '회원가입'
  title.value = '회원가입을 진행하시겠습니까?'
  sub.value = '회원정보는 가입 후 변경할 수 있습니다.'
}

//회원가입 함수
const register = async () => {
  let data = null
  try {
    data = await axiosInstance.post('/api/user-service/members', {
      loginId: loginId.value,
      password: password.value,
      memberName: memberName.value
    })

    success('회원가입이 완료되었습니다.')
    router.push('/login')
  } catch (err: any) {
    if (err.response.data.message === '이미 존재하는 loginId 입니다.') {
      warning('이미 존재하는 아이디 입니다')
    } else {
      error('오류가 발생했습니다')
    }
  }
  isModal.value = false
}

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

    <div class="register_btn" @click="registerCheck">회원가입</div>
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
