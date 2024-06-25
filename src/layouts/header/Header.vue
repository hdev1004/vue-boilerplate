<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
let isMobileMenuOpen = ref(false)

const moveHome = () => {
  router.push('/')
}
const moveLogin = () => {
  router.push('/login')
}
</script>

<template>
  <section class="header_container">
    <section class="header_blank"></section>

    <section class="header">
      <div class="logo" @click="moveHome">글루따띠온</div>

      <div class="menu_container">
        <div class="menu">BEST</div>
        <div class="menu">NEW</div>
        <div class="menu">CATEGORY</div>
      </div>

      <div class="icon_container">
        <img src="@/assets/images/header/search.png" />
        <img @click="moveLogin" src="@/assets/images/header/user.png" />
        <img src="@/assets/images/header/shop.png" />
      </div>

      <div class="mobile_menu">
        <img src="@/assets/images/header/menu.png" @click="isMobileMenuOpen = true" />
        <div
          :class="`mobile_menu_background menu_background_${isMobileMenuOpen}`"
          @click="isMobileMenuOpen = false"
        ></div>
        <div :class="`mobile_menu_drawer menu_open_${isMobileMenuOpen}`">
          <img
            class="close"
            src="@/assets/images/header/close.png"
            @click="isMobileMenuOpen = false"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./Header.scss');
</style>
