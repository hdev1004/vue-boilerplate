<script setup lang="ts">
let itemIds = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6']
let items = ref<{
  [key: string]: boolean
}>({})

const entireItemClick = () => {
  if (itemIds.length === Object.keys(items.value).length) {
    items.value = {}
  } else {
    itemIds.forEach((element) => {
      items.value[element] = true
    })
  }
}

const itemDelete = (item: string) => {
  alert(`${item} 삭제`)
}

const selectDelete = () => {
  alert('선택 삭제')
}

const selectOrder = () => {
  alert('선택 상품 주문')
}

const allOrder = () => {
  alert('전체 상품 주문')
}

const itemCheckbox = (item: string) => {
  if (items.value[item]) {
    delete items.value[item]
  } else {
    items.value[item] = true
  }
}
</script>

<template>
  <section class="shopping_container">
    <div class="shopping_logo">장바구니</div>
    <div class="item_card_container">
      <div v-for="item in itemIds" v-bind:key="item" class="item_card" :id="item">
        <div class="item_contents">
          <div class="item_images_container">
            <img class="item_image" src="@/assets/images/main/clothes1.jpg" />
          </div>
          <div>
            <div class="item_title">
              [코튼스판] 골지크롭 반팔티셔츠ddddddddddddddddddddddddddddd
            </div>
            <div class="item_price">15,000원</div>
          </div>
          <div class="item_delete" @click="itemDelete(item)">
            <img src="@/assets/images/header/closeWhite.png" />
          </div>
          <a-checkbox
            class="item_checkbox"
            :checked="items[item]"
            @change="itemCheckbox(item)"
          ></a-checkbox>
        </div>
      </div>
    </div>

    <div class="item_batch_btn">
      <div @click="entireItemClick">전체선택</div>
      <div @click="selectDelete">선택삭제</div>
    </div>

    <div class="item_cashier">
      <div>총 상품금액</div>
      <div>65,700원</div>
    </div>

    <div class="item_cashier_container">
      <div @click="selectOrder">선택상품주문</div>
      <div @click="allOrder">전체상품주문</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./shopping.scss');
</style>
