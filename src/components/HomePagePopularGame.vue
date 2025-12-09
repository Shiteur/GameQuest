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
        console.error('Unable to load popular games')
        return
      }
      this.games = await res.json()
    } catch (err) {
      console.error('Network error while loading popular games', err)
    }
  }
}
</script>

<style scoped>
</style>
