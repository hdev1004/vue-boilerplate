<script setup lang="ts">
import Header from './layouts/header/Header.vue'
import Footer from './layouts/footer/Footer.vue'

import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginCheckStore } from './stores/loginCheck'
import { warning } from './utils/vueAlert'
const loginCheckStore = useLoginCheckStore()

const route = useRoute()
const router = useRouter()
const excludeURL = ['/', '/best', '/new', '/category', '/item', '/login', '/register']

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    loginCheckStore.loginCheck()
    if (!excludeURL.includes(newPath)) {
      //로그인이 되어있어야 할 링크들에
      if (!loginCheckStore.isLogin) {
        //로그인이 안되어 있으면 홈으로 이동
        warning('로그인을 진행해주세요')
        router.push('/')
      }
    }
    console.log('Login Check : ', loginCheckStore.isLogin)
  }
)
</script>

<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<style lang="scss">
html,
body {
  padding: 0px;
  margin: 0px;
}
</style>
