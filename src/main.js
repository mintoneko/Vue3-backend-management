import '@/assets/less/main.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 默认自动去找下面的index.js

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
