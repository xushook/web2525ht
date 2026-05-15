import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'virtual:windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import axios from './utils'
// console.log('import.meta.env=>',import.meta.env)

const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(pinia).use(router).mount('#app')
