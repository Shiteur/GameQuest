<template>
  <div class="challenge-card">
    <h4>{{ challenge.title }}</h4>
    <p class="description">{{ challenge.description }}</p>
    <p class="points">+{{ challenge.points }} Game Points</p>
    <button
      class="btn"
      :disabled="isDisabled"
      @click="handleValidate"
    >
      {{ buttonLabel }}
    </button>
    <p v-if="!user" class="warning">You need to login before validate a challenge.</p>
  </div>
</template>

<script>
import '@/style/challenge-card.css'

export default {
  name: 'ChallengeCard',
  props: {
    challenge: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      default: null
    }
  },
  emits: ['user-updated'],
  data() {
    return {
      submitting: false,
      completed: false
    }
  },
  computed: {
    isDisabled() {
      return !this.user || this.submitting || this.completed || this.isAlreadyDone
    },
    buttonLabel() {
      if (!this.user) return 'Validate'
      if (this.completed || this.isAlreadyDone) return 'Already validated'
      return this.submitting ? 'Validating...' : 'Validate'
    },
    isAlreadyDone() {
      const list = this.user?.completedChallenges || []
      return list.includes(this.challenge.id)
    }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.completed = this.isAlreadyDone
      }
    }
  },
  methods: {
    async handleValidate() {
      if (!this.user || this.isDisabled) return

      try {
        this.submitting = true

        const currentPoints = Number(this.user.GamePoints || 0)
        const nextPoints = currentPoints + Number(this.challenge.points || 0)
        const completedChallenges = Array.isArray(this.user.completedChallenges)
          ? [...this.user.completedChallenges]
          : []
        if (!completedChallenges.includes(this.challenge.id)) {
          completedChallenges.push(this.challenge.id)
        }

        const payload = {
          GamePoints: nextPoints,
          completedChallenges
        }

        const res = await fetch(`http://localhost:4000/users/${this.user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!res.ok) {
          alert('Unable to validate the challenge at this time.')
          return
        }

        const updatedUser = { ...this.user, ...payload }
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        this.completed = true
        this.$emit('user-updated', updatedUser)
        alert(`Challenge "${this.challenge.title}" validated!`)
      } catch (err) {
        console.error('Error while validating the challenge', err)
        alert('Network error while validating the challenge.')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>


