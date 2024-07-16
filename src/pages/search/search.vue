<script setup lang="ts">
import SearchItems from '@/components/Home/SearchItems.vue'
const route = useRoute()
const keyword = ref<string>('')
</script>

<template>
  <section class="search_container">
    <SearchItems :title="`'${route.query.keyword}' 검색내용`" />
  </section>
</template>

<style lang="scss" scoped>
@import url('./search.scss');
</style>
