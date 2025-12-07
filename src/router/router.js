import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/Page/HomePage.vue'
import LoginPage from '@/Page/LoginPage.vue'
import RegisterPage from '@/Page/RegisterPage.vue'
import ProfilePage from '@/Page/ProfilePage.vue'
import GamePage from '@/Page/GamePage.vue'


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/profile/:id', name: 'profile', component: ProfilePage },
  { path: '/game/:slug', name: 'game', component: GamePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
