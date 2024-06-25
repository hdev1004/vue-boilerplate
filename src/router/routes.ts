import loginRouter from './login/loginRouter.js'
import registerRouter from './register/registerRouter.js'
import { vueRouter } from 'storybook-vue3-router'

const CustomRouter = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  ...loginRouter,
  ...registerRouter
]

export default CustomRouter
