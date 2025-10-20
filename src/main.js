import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

// Iport styles for game page need to be globally available
import './assets/style/GamePage.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
