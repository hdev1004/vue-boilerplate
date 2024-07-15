// axios 모듈을 가져옵니다.

import router from '@/router'
import { useLoginCheckStore } from '@/stores/loginCheck'
import { error, warning } from '@/utils/vueAlert'
import axios from 'axios'
import Cookies from 'js-cookie'

const loginCheckStore = useLoginCheckStore()

const AxiosInstance = axios.create({
  baseURL: '/', // 기본 URL 설정
  timeout: 10000 // 요청이 타임아웃되기까지의 시간 (ms)
})

const excludeURL = ['/api/user-service/login', '/api/user-service/members']

//요청 인터셉터
AxiosInstance.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem('memberToken')
    const token = tokenString ? JSON.parse(tokenString) : {}

    const url = config.url ? config.url : ''

    if (excludeURL.includes(url)) {
      //URL이 포함이 되어있는지 여부
      return config
    }
    if (token.memberToken) {
      config.headers['Authorization'] = `Bearer ${token.memberToken}`
    }
    //요청 보내기 전에 수행 로직
    return config
  },
  (err) => {
    //요청 에러 시 수행 로직
    return Promise.reject(err)
  }
)

//응답 인터셉터
AxiosInstance.interceptors.response.use(
  (response) => {
    //응답에 대한 로직
    const res = response

    return res
  },
  (err) => {
    if (err.response.data.code === 'JWT_EXPIRED') {
      warning('로그아웃 되었습니다.')
      warning('로그인을 다시 시도해주세요.')
      loginCheckStore.logout()
      router.push('/login')
      return null
    } else if (err.response.data.message === 'No authorization header') {
      warning('해당 작업은 로그인이 필요합니다 🥹')
      return null
    }
    return Promise.reject(err)
  }
)

export default AxiosInstance
