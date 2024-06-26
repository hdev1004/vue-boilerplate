// axios 모듈을 가져옵니다.
import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 기본 URL 설정
  timeout: 10000, // 요청이 타임아웃되기까지의 시간 (ms)
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer your_token_here' // 필요에 따라 헤더 추가
  }
})

//요청 인터셉터
AxiosInstance.interceptors.request.use(
  (config) => {
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
    const res = response.data
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default AxiosInstance
