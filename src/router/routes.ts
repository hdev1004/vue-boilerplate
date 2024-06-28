import bestRouter from './best/bestRouter.js'
import categoryRouter from './category/categoryRouter.js'
import itemRouter from './item/itemRouter.js'
import loginRouter from './login/loginRouter.js'
import mypageRouter from './mypage/mypageRouter.js'
import newRouter from './new/newRouter.js'
import registerRouter from './register/registerRouter.js'
import { vueRouter } from 'storybook-vue3-router'

const CustomRouter = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  ...categoryRouter,
  ...bestRouter,
  ...newRouter,
  ...loginRouter,
  ...registerRouter,
  ...mypageRouter,
  ...itemRouter
]

export default CustomRouter
