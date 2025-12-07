<template>
  <section class="WeeklyChallenge">
    <h2>Weakly Challenge </h2>
    <p>Here all Challenge you can realase during this week.</p>
    <div class="challenge-list">
      <ChallengeCard
        v-for="(challenge, index) in lastChallenges"
        :key="challenge.id || index"
        :challenge="challenge"
        :user="user"
        @user-updated="onUserUpdated"
      />
      <p v-if="!lastChallenges.length" class="empty">No challenges found.</p>
    </div>
  </section>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard.vue'
import '@/style/weekly-challenge.css'

export default {
  components: { ChallengeCard },
  data() {
    return {
      challenges: [],
      user: null
    }
  },
  computed: {
    lastChallenges() {
      // Take last challenges, newest first
      return this.challenges.slice(-10).reverse()
    }
  },
  async created() {
    try {
      const res = await fetch('http://localhost:4000/challenges')
      if (!res.ok) {
        console.error('Impossible de charger les challenges')
        return
      }
      const data = await res.json()
      this.challenges = Array.isArray(data) ? data : []
    } catch (err) {
      console.error('Erreur réseau lors du chargement des challenges', err)
    }

    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      this.user = JSON.parse(storedUser)
    }
  },
  methods: {
    onUserUpdated(updated) {
      this.user = updated
    }
  }
}
</script>

<style scoped>
</style>
