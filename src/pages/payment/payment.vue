<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'

const deliverUserInfo = ref('1')
const route = useRoute()

const options = ref<SelectProps['options']>([
  {
    value: '010',
    label: '010'
  },
  {
    value: '011',
    label: '011'
  },
  {
    value: '016',
    label: '016'
  },
  {
    value: '017',
    label: '017'
  },
  {
    value: '018',
    label: '018'
  },
  {
    value: '019',
    label: '019'
  }
])
</script>

<template>
  <section class="payment_container">
    <div class="payment_logo">결제</div>
    <div class="payment_body">
      <div class="payment_card">
        <div class="payment_title">주문자 정보</div>
        <div class="payment_order">
          <div class="payment_order_row">
            <div class="payment_order_row_title">주문자 *</div>
            <input />
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">휴대전화 *</div>
            <a-select :options="options" class="payment_phone_select" size="large"></a-select>
            <div class="div">-</div>
            <input />
            <div class="div">-</div>
            <input />
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">이메일</div>
            <input />
            <div class="div">@</div>
            <input />
          </div>
        </div>
      </div>

      <div class="payment_line"></div>

      <div class="payment_card">
        <div class="payment_title">배송지</div>
        <div class="payment_order_select">
          <a-radio-group v-model:value="deliverUserInfo" name="radioGroup">
            <a-radio value="1">주문자 정보와 동일</a-radio>
            <a-radio value="2">새로운 배송지</a-radio>
          </a-radio-group>
        </div>
        <div class="payment_order">
          <div class="payment_order_row">
            <div class="payment_order_row_title">받는사람 *</div>
            <input />
          </div>
          <div class="payment_order_row" style="height: auto !important; line-height: normal">
            <div class="payment_order_row_title">주소 *</div>
            <div class="payment_order_address">
              <div class="payment_order_addres_search">
                <input placeholder="우편번호" />
                <div>주소검색</div>
              </div>
              <input placeholder="기본주소" />
              <input placeholder="상세주소" />
            </div>
          </div>
          <div class="payment_order_row">
            <div class="payment_order_row_title">휴대전화 *</div>
            <a-select :options="options" class="payment_phone_select" size="large"></a-select>
            <div class="div">-</div>
            <input />
            <div class="div">-</div>
            <input />
          </div>
        </div>
      </div>
      <div class="payment_line"></div>

      <div class="payment_card">
        <div class="payment_title">주문상품</div>
        <div class="payment_items">
          <div
            class="payment_item"
            v-for="(item, index) in [1, 2, 3, 4, 5]"
            v-bind:key="`item${index}`"
          >
            <img class="payment_item_image" src="@/assets/images/main/clothes1.jpg" />
            <div class="payment_item_contents">
              <div class="payment_item_title">[COOL] 와이드 진(INDOGO)_SPTJE25G51</div>
              <div class="payment_item_quantity">수량 : 1개</div>
              <div class="payment_item_price">39,900</div>
              <div class="payment_item_close">
                <img src="@/assets/images/header/closeWhite.png" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="payment_last">
        <div>39,000 원 결제하기</div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import url('./payment.scss');
</style>
