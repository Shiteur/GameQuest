<template>
    <section class="home">
        <WeeklyChallenge />
        <LeaderBoard />
        <PopularGame />
    </section>
</template>

<script>
import WeeklyChallenge from '../components/HomePageWeeklyChallenge.vue'
import LeaderBoard from '../components/HomePageLeaderBoard.vue'
import PopularGame from '../components/HomePagePopularGame.vue'

export default {
    name: 'HomePage',
    components: {
        WeeklyChallenge,
        LeaderBoard,
        PopularGame,
    }
}
</script>

<style scoped>
</style>
