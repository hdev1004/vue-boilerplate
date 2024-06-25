import LoginRouter from './login/loginRouter.js'
import { vueRouter } from 'storybook-vue3-router'

const CustomRouter = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  ...LoginRouter
]

export default CustomRouter
