import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import Cookies from 'js-cookie'
import { warning } from '@/utils/vueAlert'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  try {
    const token = JSON.parse(window.localStorage.getItem('memberToken'))
    console.log('TOKEN : ', token)
    console.log(Date.now(), token?.expires)
    if (Date.now() > token?.expires) {
      console.log('Token is expires')
      Cookies.remove('member')
      window.localStorage.removeItem('memberToken')
      router.push('/')
      setTimeout(() => {
        warning('로그인이 만료되었습니다.')
      }, 100)
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
    next()
  }
})
export default router
