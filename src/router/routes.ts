import LoginRouter from './login/loginRouter.js'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/index.vue')
  },
  ...LoginRouter
]
