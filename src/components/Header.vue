<template>
    <header>
        <div class="main">
            <img src="../assets/logo_GameQuest.png" alt="Logo de Game Quest"/>
            <h1>Game Quest</h1>
        </div>

        <nav class="nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/game/LeagueOfLegends">League of Legends</RouterLink>
            <RouterLink to="/game/TeamFightTactics">Teamfight Tactics</RouterLink>
            <RouterLink v-if="!user" to="/login">Connection</RouterLink>
            <RouterLink v-if="!user" to="/register">Register</RouterLink>
        </nav>

        <div class="search">
            <input type="text" placeholder="search"/>
        </div>
        <div class="sign">
            <RouterLink v-if="!user" to="/login">Connection</RouterLink>
            <RouterLink v-else :to="`/profile/${user.id}`">{{ user.username }}</RouterLink>
        </div>
    </header>
</template>

<script>
export default{
  name: "Header",
  data(){
    return{
      user:null
    }
  },
  created(){
    this.loadUser()
     window.addEventListener('storage', this.loadUser)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.loadUser)
  },
  methods:{
    loadUser(){
      const storedUser = localStorage.getItem('currentUser')
      
      this.user = storedUser ? JSON.parse(storedUser) : null
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #253eac;
  color: white;
  padding: 1rem 2rem;
}
.main {
  display: flex;
  align-items: center;
  gap: 10px;
}
.main img {
  width: 80px;
  height: 80px;
}
nav {
  display: flex;
  gap: 1rem;
}
a {
  color: #02f7f7;
  text-decoration: none;
}
a.router-link-active {
  font-weight: bold;
  color: #029797;
}
.search input {
  padding: 5px;
  margin-right: 10px;
}
.sign a {
  font-weight: bold;
  color: #00ffdd;
}
</style>