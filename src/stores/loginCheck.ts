import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useLoginCheckStore = defineStore('login', () => {
  const isLogin = ref(false)

  const logout = () => {
    Cookies.remove('member')
    localStorage.removeItem('memberToken')
  }
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

  const memberInfo = () => {
    if (isLogin.value) {
      const cookieString = Cookies.get('member')
      const tokenString = localStorage.getItem('memberToken')
      let token = null
      let cookie = null

      if (tokenString) token = JSON.parse(tokenString)
      if (cookieString) cookie = JSON.parse(cookieString)
      return {
        ...cookie,
        ...token
      }
    }
  }

  return { isLogin, loginCheck, memberInfo, logout }
})
