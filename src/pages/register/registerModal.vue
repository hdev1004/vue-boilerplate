<script setup lang="ts">
const modalRef = ref()
//인자 넘겨 받을 때 선언하는 부분 (타입 지정)
const props = defineProps({
  /**Modal 여부 */
  isModal: Boolean,
  /**Modal Type */
  type: String,
  /**Modal 제목 */
  title: String,
  /**Modal 부제목 */
  sub: String,
  /**Modal 확인 버튼 엑션 */
  action: Function,
  /**Modal 닫기 엑션 */
  close: Function
})
</script>

<template>
  <section>
    <div :class="`modal_background modal_background_${isModal}`" @click="props.close"></div>
    <div :class="`modal modal_${isModal}`" ref="modalRef">
      <div class="modal_header">{{ props.type === '오류' ? '확인해주세요 🫢' : '회원가입' }}</div>

      <div class="modal_body">
        <div class="modal_title">{{ props.title }}</div>
        <div class="modal_sub">{{ props.sub }}</div>
        <div class="modal_close" @click="props.close">
          <img src="@/assets/images/header/close.png" />
        </div>
      </div>

      <div class="modal_btn" @click="props.action">확인</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./registerModal.scss');
</style>
