<script setup lang="ts">
import { error, success, warning } from '@/utils/vueAlert'
import RegisterModal from './registerModal.vue'
import axiosInstance from '@/axios/axiosInstance'
import type { SelectProps } from 'ant-design-vue'
import AxiosInstance from '@/axios/axiosInstance'

const isIdCheckClick = ref(false)
const isIdDup = ref(false)
const isModal = ref(false)
const loginId = ref('')
const password = ref('')
const rePassword = ref('')
const memberName = ref('')

const postCode = ref('') //우편번호
const address = ref('')
const address_detail = ref('')
const phone1 = ref('010')
const phone2 = ref('')
const phone3 = ref('')
const email_id = ref('')
const email_domain = ref('')

const errorType = ref('none')
const type = ref('회원가입') //회원가입, 오류 2개의 타입
const title = ref('회원가입을 진행하시겠습니까?')
const sub = ref('회원정보는 가입 후 변경할 수 있습니다.')
const router = useRouter()
const isError = ref(false)

warning('회원가입 기능 변경 중 입니다.')
warning('테스트 계정으로 로그인 부탁드립니다 .🥹')
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
      address.value = data.address
      postCode.value = data.zonecode
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.
    }
  }).open()
}

const registerCheck = () => {
  if (isIdCheckClick.value === false) {
    warning('아이디 중복 확인을 클릭해주세요.')
    return
  }

  if (isIdDup.value) {
    warning('아이디가 중복되었습니다')
    return
  }

  if (loginId.value.trim() === '') {
    errorType.value = '아이디'
    type.value = '오류'
    title.value = '아이디를 입력해주세요.'
    sub.value = ''
    isError.value = true
    return
  }

  if (password.value.trim() === '') {
    errorType.value = '비밀번호'
    type.value = '오류'
    title.value = '비빌번호를 입력해주세요.'
    sub.value = ''
    isError.value = true
    return
  }

  if (password.value !== rePassword.value) {
    errorType.value = '비밀번호확인'
    type.value = '오류'
    title.value = '비밀번호가 같지 않습니다.'
    sub.value = ''
    isError.value = true
    return
  }

  if (memberName.value.trim() === '') {
    errorType.value = '사용자이름확인'
    type.value = '오류'
    title.value = '사용자 이름을 입력해주세요.'
    sub.value = ''
    isError.value = true
    return
  }

  errorType.value = 'none'

  isModal.value = true
  isError.value = false
  type.value = '회원가입'
  title.value = '회원가입을 진행하시겠습니까?'
  sub.value = '회원정보는 가입 후 변경할 수 있습니다.'
}

const idDupCheck = async () => {
  //아이디 중복 체크
  let id = loginId.value

  if (id.trim() === '') {
    warning('아이디를 입력해주세요')
    return
  }

  if (id.length <= 5) {
    warning('아이디는 6글자 이상 입력해주세요')
    return
  }

  try {
    let data = await AxiosInstance.get(`/api/user-service/members/loginId?loginId=${id}`)
    isIdDup.value = data.data.duplicate

    if (isIdDup.value) {
      warning('이미 사용되고 있는 아이디 입니다.')
      isIdCheckClick.value = false
    } else {
      isIdCheckClick.value = true
      success('사용할 수 있는 아이디 입니다.')
    }
  } catch (err: any) {
    console.log(err)
    error('관리자에게 문의해주세요')
  }
}

//회원가입 함수
const register = async () => {
  let data = null
  if (errorType.value !== 'none') {
    isModal.value = false
    return
  }

  if (isIdCheckClick.value === false) {
    warning('아이디 중복체크를 클릭해주세요.')
    return
  }
  if (isIdDup.value) {
    warning('이미 사용되고 있는 아이디 입니다.')
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

  try {
    data = await axiosInstance.post('/api/user-service/members', {
      loginId: loginId.value,
      password: password.value,
      memberName: memberName.value,
      phoneNumber: `${phone1.value}${phone2.value}${phone3.value}`,
      email: `${email_id.value}@${email_domain.value}`,
      postNumber: postCode.value,
      address: address.value,
      addressDetail: address_detail.value
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

onMounted(() => {
  const script = document.createElement('script') //script 변수 선언해서 <scrpit /> 얘를 만들어가지고 담는다
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' //script의 src속성에 카카오에서 제공한 주소값을 넣어준다
  document.head.appendChild(script) //head에 src 속성까지 만들어진 script소스를   append한다
})

//loginId, password, rePassword,memberName
</script>

<template>
  <section class="register">
    <div class="title">회원가입</div>

    <div class="payment_body">
      <div class="payment_card">
        <div class="payment_title">회원 정보</div>
        <div class="payment_order">
          <div class="payment_order_row">
            <div class="payment_order_row_title">아이디 *</div>
            <input
              placeholder="아이디를 입력하세요"
              v-model="loginId"
              @keypress="isIdCheckClick = false"
            />
            <div class="register_id_check" @click="idDupCheck">아이디 중복 확인</div>
          </div>

          <div class="payment_order_row">
            <div class="payment_order_row_title">비밀번호 *</div>
            <input placeholder="비밀번호를 입력하세요" type="password" v-model="password" />
          </div>

          <div class="payment_order_row">
            <div class="payment_order_row_title">비빌번호 확인 *</div>
            <input placeholder="비밀번호를 다시 입력하세요" type="password" v-model="rePassword" />
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">성함 *</div>
            <input placeholder="성함을 입력하세요" v-model="memberName" />
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
            <input v-model="phone2" type="number" />
            <div class="div">-</div>
            <input v-model="phone3" type="number" />
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
                <input placeholder="우편번호" disabled v-model="postCode" />
                <div @click="findAddress()">주소검색</div>
              </div>
              <input placeholder="기본주소" disabled v-model="address" />
              <input placeholder="상세주소" v-model="address_detail" />
            </div>
          </div>
        </div>
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
@import url('../payment/payment.scss');
</style>
