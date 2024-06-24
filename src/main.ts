import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from '@/App.vue'
import router from '@/router/index'
import Antd from 'ant-design-vue'

const app = createApp(App)
app.use(Antd) // Ant Design Vue 사용 설정
/** Pinia **/
/** https://pinia.vuejs.org/ **/
const pinia = createPinia()
app.use(pinia)

/** Vue Router **/
/** https://router.vuejs.org/ **/
app.use(router)

/** Unhead **/
/** https://unhead.unjs.io/ **/
const head = createHead()
app.use(head)

app.mount('#app')
