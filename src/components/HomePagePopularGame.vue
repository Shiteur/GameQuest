<template>
  <section class="PopularGame">
    <h2>Popular Game</h2>
    <p>You can fond the most popular game of Game Quest's user.</p>
    <div class="games">
      <RouterLink
        v-for="(game, index) in firstGames"
        :key="index"
        :to="game.path || `/game/${game.slug}`"
      >
        <img :src="game.icon" :alt="`${game.name} cover`" />
        <p>{{ game.name }}</p>
      </RouterLink>
    </div>
  </section>
</template>

<script>
import '@/style/popular-game.css'

export default {
  data() {
    return {
      games: []
    }
  },
  computed: {
    firstGames() {
      return this.games.slice(0, 15)
    }
  },
  async created() {
    try {
      const res = await fetch('http://localhost:4000/games')
      if (!res.ok) {
        console.error('Impossible de charger les jeux populaires')
        return
      }
      this.games = await res.json()
    } catch (err) {
      console.error('Erreur réseau lors du chargement des jeux', err)
    }
  }
}
</script>

<style scoped>
</style>
