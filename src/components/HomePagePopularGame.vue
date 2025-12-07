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
.PopularGame {
  padding: 3rem;
  text-align: center;
}
.games{
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 18px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.06));
  box-shadow: 0 6px 18px rgba(11,10,20,0.45);
}
.games a {
  text-decoration: none;
  flex: 1;
  min-width: 200px;
  background: rgba(255, 255, 255, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  border-radius: 6px;
}
.games a:hover {
  box-shadow: 0 6px 18px rgba(11,10,20,0.45);
}
.games img {
  width: 40%;
  border-radius: 10px;
}
.games p {

  margin: 0;
  line-height: 1.55;
  color: #008ecf;
  font-size: 0.98rem;
  background: rgba(255,255,255,0.01);
  padding: 10px 12px;
  border-radius: 6px;
}
</style>
