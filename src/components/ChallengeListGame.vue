<template>
    <section class="challenge">
        <h3>Challenges</h3>
        <ChallengeCard
          v-for="(challenge, index) in challenges"
          :key="challenge.id || index"
          :challenge="challenge"
          :user="user"
          @user-updated="onUserUpdated"
        />
    </section>
</template>

<script>
import ChallengeCard from '@/components/ChallengeCard.vue'

export default {
    name: 'ChallengeListGame',
    components: { ChallengeCard },
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
            try {
                const ans = await fetch(`http://localhost:4000/challenges?game=${encodeURIComponent(this.game)}`)
                if (!ans.ok) {
                    console.error('Impossible de charger les défis')
                    return
                }
                this.challenges = await ans.json()
            } catch (err) {
                console.error('Erreur réseau lors du chargement des défis', err)
            }
        },
        onUserUpdated(updated) {
            this.user = updated
        }
    }
}
</script>

