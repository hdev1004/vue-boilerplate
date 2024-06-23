<script setup lang="ts">
import AxiosInstance from '../axios/axiosInstance'

const Test = async () => {
  let data = await AxiosInstance('/products/1')
  console.log(data)
}
</script>

<template>
  <button :class="$style.button" @click="Test">
    <slot>Submit</slot>
  </button>
</template>

<style lang="scss" module>
.button {
  @extend %typography-small;

  padding: $size-button-padding;
  border: none;
  background: $color-button-bg;
  color: $color-button-text;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background: $color-button-disabled-bg;
  }
}
</style>
