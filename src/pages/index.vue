<script setup lang="ts">
import BaseInputText from '@/components/BaseInputText.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useCounterStore } from '@/stores/counter'

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
    <button
      @click="
        () => {
          useCounterStore().increment()
        }
      "
    >
      증가
    </button>
    <div>Number : {{ useCounterStore().count }}</div>
  </AppLayout>
</template>

<style lang="scss" scoped></style>
