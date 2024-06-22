<script setup lang="ts">
import BaseInputText from '@/components/BaseInputText.vue'
import BaseButton from '@/components/BaseButton.vue'

useHead({
  title: 'Home - Vue Enterprise Boilerplate',
  meta: [
    {
      name: 'description',
      content: 'Welcome to the Vue Enterprise Boilerplate!'
    }
  ]
})
</script>

<template>
  <AppLayout>
    <h1>Home Page</h1>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <BaseInputText />
    <BaseButton />
  </AppLayout>
</template>

<style lang="scss" scoped></style>
