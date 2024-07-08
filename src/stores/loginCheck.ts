import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useLoginCheckStore = defineStore('login', () => {
  const isLogin = ref(false)

  const loginCheck = () => {
    const tokenString = localStorage.getItem('memberToken')
    const cookieString = Cookies.get('member')
    let cookie = null
    if (cookieString) {
      cookie = JSON.parse(cookieString)
    }
    const token = tokenString ? JSON.parse(tokenString) : {}
    if (token?.memberToken && cookie?.memberId) {
      isLogin.value = true
    } else {
      localStorage.removeItem('memberToken')
      Cookies.remove('member')
      isLogin.value = false
    }
  }

  return { isLogin, loginCheck }
})
