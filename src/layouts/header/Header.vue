<script setup lang="ts">
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { ref } from 'vue'
import { useLoginCheckStore } from '@/stores/loginCheck'
const scrollY = ref(window.scrollY)

const isTop = ref(window.scrollY === 0 ? true : false)
const userHover = ref(false)
const shopHover = ref(false)
const searchClick = ref(false)

const router = useRouter()
let isMobileMenuOpen = ref(false)

const loginCheckStore = useLoginCheckStore()

const logout = () => {
  if (confirm('로그아웃 하시겠습니까?')) {
    window.localStorage.removeItem('memberToken')
    Cookies.remove('member')
    router.push('/')
    isMobileMenuOpen.value = false
  }
}

const search = () => {
  searchClick.value = !searchClick.value
}

const moveMenu = (link: string) => {
  router.push(link)
  isMobileMenuOpen.value = false
}

const moveHome = () => {
  router.push('/')
}
const moveLogin = () => {
  let memberInfo = Cookies.get('member')
  if (memberInfo) {
    router.push('/mypage')
  } else {
    router.push('/login')
  }
}

const moveShop = () => {
  console.log(loginCheckStore.isLogin)
  if (!loginCheckStore.isLogin) {
    router.push('/login')
  } else {
    router.push('./shopping')
  }
}

const handleScroll = () => {
  if (window.scrollY === 0) {
    isTop.value = true
  } else {
    isTop.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section :class="`header_container header_istop_${isTop}`">
    <section class="header_blank"></section>

    <section class="header">
      <div class="logo" @click="moveHome">글루따띠온</div>

      <div class="menu_container">
        <div class="menu" @click="$router.push('/best')">BEST</div>
        <div class="menu" @click="$router.push('/new')">NEW</div>
        <div class="menu" @click="$router.push('/category')">CATEGORY</div>
      </div>

      <div class="icon_container">
        <div :class="`search_container tablet_search_container_${searchClick}`">
          <input class="search_input" placeholder="search..." />
          <img class="search_img" src="@/assets/images/header/search.png" />
        </div>
        <img src="@/assets/images/header/search.png" @click="search" />
        <div @mouseleave="userHover = false">
          <img
            @click="moveLogin"
            src="@/assets/images/header/user.png"
            @mouseenter="userHover = true"
          />

          <div v-if="userHover" class="user_description_container">
            <div v-if="loginCheckStore.isLogin" @click="$router.push('/mypage')">마이페이지</div>
            <div v-if="loginCheckStore.isLogin" @click="logout">로그아웃</div>

            <div v-if="!loginCheckStore.isLogin" @click="$router.push('/login')">로그인</div>
            <div v-if="!loginCheckStore.isLogin" @click="$router.push('/register')">회원가입</div>
          </div>
        </div>

        <div @mouseleave="shopHover = false">
          <img
            @click="moveShop"
            src="@/assets/images/header/shop.png"
            @mouseenter="shopHover = true"
          />

          <div v-if="shopHover" class="shop_description_container">
            <div v-if="loginCheckStore.isLogin" @click="$router.push('/shopping')">장바구니</div>
            <div v-if="loginCheckStore.isLogin" @click="$router.push('/wishlist')">찜목록</div>
          </div>
        </div>
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

          <div style="margin-top: 50px"></div>
          <div class="mobile_login_text">
            <div v-if="!loginCheckStore.isLogin">고객님은 로그아웃 상태입니다.</div>
            <div v-if="!loginCheckStore.isLogin">회원가입 하시고 많은 혜택 받아가세요!</div>

            <div v-if="loginCheckStore.isLogin">
              {{ loginCheckStore.memberInfo().memberName }}님 안녕하세요.
            </div>
            <div v-if="loginCheckStore.isLogin">글루따띠온에 방문해주셔서 감사합니다</div>

            <div class="logout_btn" v-if="loginCheckStore.isLogin" @click="logout()">로그아웃</div>
          </div>

          <div class="mobile_login_line"></div>

          <div v-if="!loginCheckStore.isLogin" class="mobile_menu_bar">
            <div @click="moveMenu('/login')">로그인</div>
            <div @click="moveMenu('/register')">회원가입</div>
          </div>

          <div v-if="loginCheckStore.isLogin" class="mobile_menu_bar">
            <div @click="moveMenu('/mypage')">마이페이지</div>
            <div @click="moveMenu('/shopping')">장바구니</div>
            <div @click="moveMenu('/wishlist')">찜목록</div>
          </div>

          <div class="mobile_menu_shop">Shop</div>

          <div class="mobile_mebu_sub_shop">
            <div @click="moveMenu('/best')">Best</div>
            <div @click="moveMenu('/new')">New</div>
            <div @click="moveMenu('/category')">Category</div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
@import url('./Header.scss');
</style>
