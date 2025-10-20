import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/Page/HomePage.vue'
import LoginPage from '@/Page/LoginPage.vue'
import RegisterPage from '@/Page/RegisterPage.vue'
import ProfilePage from '@/Page/ProfilePage.vue'
import LeagueOfLegendsPage from '@/Page/LeagueOfLegendsPage.vue'
import TeamFightTacticsPage from '@/Page/TeamFightTacticsPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/profile/:id', name: 'profile', component: ProfilePage },
  { path: '/game/LeagueOfLegends', name: 'LeagueOfLegends', component: LeagueOfLegendsPage},
  { path: '/game/TeamFightTactics', name:'TeamFIghtTactics', component: TeamFightTacticsPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router