import bestRouter from './best/bestRouter.js'
import categoryRouter from './category/categoryRouter.js'
import couponRouter from './coupon/couponRouter.js'
import findIdRouter from './findId/findIdRouter.js'
import findPwRouter from './findPw/findPwRouter.js'
import itemRouter from './item/itemRouter.js'
import loginRouter from './login/loginRouter.js'
import mypageRouter from './mypage/mypageRouter.js'
import newRouter from './new/newRouter.js'
import paymentRouter from './payment/paymentRouter.js'
import registerRouter from './register/registerRouter.js'
import searchRouter from './search/searchRouter.js'
import shoppingRouter from './shopping/shoppingRouter.js'
import wishlistRouter from './wishlist/wishlistRouter.js'

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
  ...itemRouter,
  ...shoppingRouter,
  ...wishlistRouter,
  ...searchRouter,
  ...couponRouter,
  ...paymentRouter,
  ...findIdRouter,
  ...findPwRouter
]

export default CustomRouter
