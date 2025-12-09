import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/Page/HomePage.vue'
import LoginPage from '@/Page/LoginPage.vue'
import RegisterPage from '@/Page/RegisterPage.vue'
import ProfilePage from '@/Page/ProfilePage.vue'
import GamePage from '@/Page/GamePage.vue'
import AdminPage from '@/Page/AdminPage.vue'


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/profile/:id', name: 'profile', component: ProfilePage },
  { path: '/game/:slug', name: 'game', component: GamePage },
  { path: '/admin', name: 'adminPage', component: AdminPage, meta: { requiresAdmin: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard to check for admin access
router.beforeEach((to, from, next) => {
  const storedUser = localStorage.getItem("currentUser")
  const user = storedUser ? JSON.parse(storedUser) : null

  if (to.meta.requiresAdmin && (!user || user.role !== "admin")) {
    return next("/") // Redirect non-admin users to home
  }
  next()
})


export default router
