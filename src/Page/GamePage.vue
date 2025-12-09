<template>
  <div v-if="loading" class="status">Loading game...</div>
  <div v-else-if="error" class="status error">{{ error }}</div>
  <div v-else-if="game">

      <h2 class="h2gamepage">{{ game.name }}</h2>

    <section class="Description">
      <img :src="gameImage" :alt="`${game.name} cover`" />
      <div class="content">
        <h3>Description</h3>
        <p>{{ game.description }}</p>
      </div>
    </section>
    <ChallengeListGame :game="challengeKey" />
  </div>
  <div v-else class="status error">Game not found.</div>
</template>

<script>
import { computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import ChallengeListGame from '@/components/ChallengeListGame.vue'

export default {
  name: 'GamePage',
  components: { ChallengeListGame },
  setup() {
    const route = useRoute()
    const game = ref(null)
    const error = ref('')
    const loading = ref(true)

    const challengeKey = computed(() => String(route.params.slug || ''))

    const gameImage = computed(() => {
      if (!game.value) return ''
      const icon = game.value.icon || ''
      if (icon.startsWith('http')) {
        return icon
      }
      return 'https://placehold.co/600x400/232323/ffffff?text=Game+cover'
    })

    const fetchGame = async () => {
      loading.value = true
      error.value = ''
      game.value = null

      try {
        const slug = route.params.slug
        if (!slug) {
          error.value = 'No game requested.'
          loading.value = false
          return
        }

        const res = await fetch(`http://localhost:4000/games?slug=${encodeURIComponent(slug)}`)
        if (!res.ok) {
          error.value = res.status === 404 ? 'Game not found.' : 'Error loading the game.'
          return
        }
        game.value = await res.json()
      } catch (err) {
        console.error(err)
        error.value = 'Network error while loading the game.'
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchGame)
    watch(() => route.params.slug, fetchGame)

    return { game, error, loading, challengeKey, gameImage }
  }
}
</script>

<style scoped>
</style>
