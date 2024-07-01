import { defineStore } from 'pinia'

export const useLoginCheckStore = defineStore('login', () => {
  const isLogin = () => {
    const tokenString = localStorage.getItem('memberToken')
    const token = tokenString ? JSON.parse(tokenString) : {}
    if (token?.memberToken) {
      return true
    } else {
      return false
    }
  }

  return { isLogin }
})
