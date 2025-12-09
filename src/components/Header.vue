<template>
    <header>
        <div class="main">
            <RouterLink to="/"><img src="../assets/GameQuestLogo.png" alt="Logo de Game Quest"/></RouterLink>
            <h1>Game Quest</h1>
        </div>

        <div class="search">
            <input type="text" v-model="query" placeholder="Search a game..."/>
            <ul v-if="filteredgames.length && query">
              <li v-for="(game, i) in filteredgames" :key="i" @click="goToGame(game)">
                
                <span class="game-name">{{ game.name }}</span>
              </li>
            </ul>
        </div>
        <div class="sign">
            <RouterLink v-if="!user" to="/login">Sign in</RouterLink>
            <RouterLink v-else :to="`/profile/${user.id}`">{{ user.username }}</RouterLink>
        </div>
    </header>
</template>

<script>
export default{
  name: "Header",
  data(){
    return{
      user:null,
      query: "",
      games: []
    }
  },
  async created(){
    this.loadUser()
    await this.fetchGames()
    window.addEventListener('storage', this.loadUser)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.loadUser)
  },
  computed:{
    filteredgames(){
      const q = this.query.trim().toLowerCase()
      if (!q) return []
      return this.games.filter(game =>
        (game.name || '').toLowerCase().includes(q) ||
        (game.shortName || '').toLowerCase().includes(q)
      );
    }
  },
  methods:{
    loadUser(){
      const storedUser = localStorage.getItem('currentUser')
      
      this.user = storedUser ? JSON.parse(storedUser) : null
    },
    async fetchGames() {
      try {
        const res = await fetch('http://localhost:4000/games')
        if (!res.ok) {
          console.error('Unable to load game list.')
          return
        }
        this.games = await res.json()
      } catch (err) {
        console.error('Network error while loading games', err)
      }
    },
    goToGame(game){
      const path = game.path || `/game/${game.slug || ''}`
      if (path) {
        this.$router.push(path);
      }
      this.query="";
    }
  }
}
</script>

<style scoped>
</style>
