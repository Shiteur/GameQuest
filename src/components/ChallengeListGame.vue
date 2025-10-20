<template>
    <section class="challenge">
        <h3>Challenges</h3>
        <div v-for="(challenge, index) in challenges":key="index" class="challenges">
            <h4>{{ challenge.title }}</h4>
            <p>{{ challenge.description }}</p>
            <p>+{{ challenge.points }} Game Points</p>
            <button class="btn" :disabled="!user" @click="validate(challenge)">Validate</button>
            <p v-if="!user" class="warning"> You need to login before validate a challenge.</p>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ChallengeListGame',
    props: {
        game: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            challenges: [],
            user: null
        }
    },
    async created() {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            this.user = JSON.parse(storedUser)
        }

        await this.fetchChallenges()
    },
    methods: {
        async fetchChallenges(){
            const ans = await fetch(`http://localhost:3001/challenges?game=${this.game}`)
            this.challenges = await ans.json()
        },
        // For testing the good work later a true fonction with add point to the user.
        validate(challenge) {
            if (!this.user) {
                alert('You need to login before validate a challenge.')
                this.$router.push('/login')
                return
            }

            alert(`Challenge "${challenge.title}" validé !`)
        }
    }
}
</script>
<style scoped>
.btn:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.warning {
  color: red;
  font-size: 0.9rem;
}
</style>