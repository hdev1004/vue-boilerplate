import { message } from 'ant-design-vue'
import type { JointContent } from 'ant-design-vue/es/message/interface'

/**
 * 성공 Alert
 * @param msg 메시지
 */
export const success = (msg: JointContent) => {
  message.success(msg)
}

/**
 * 오류 Alert
 * @param msg 메시지
 */
export const error = (msg: JointContent) => {
  message.error(msg)
}

/**
 * 경고 Alert
 * @param msg 메시지
 */
export const warning = (msg: JointContent) => {
  message.warning(msg)
}
