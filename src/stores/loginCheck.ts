import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export const useLoginCheckStore = defineStore('login', () => {
  const isLogin = () => {
    const token = JSON.parse(window.localStorage.getItem('memberToken'))
    if (token?.memberToken) {
      return true
    } else {
      return false
    }
  }

  return { isLogin }
})
