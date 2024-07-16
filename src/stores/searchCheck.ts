import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchModalStore = defineStore('search', () => {
  const isSearchModal = ref(false)
  const changeModal = (trigger: boolean) => {
    isSearchModal.value = trigger
  }

  return { isSearchModal, changeModal }
})
