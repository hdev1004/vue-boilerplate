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

export default AxiosInstance
