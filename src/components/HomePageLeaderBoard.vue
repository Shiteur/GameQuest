<template>
  <section class="LeaderBoard">
    <h2>Leader Board of the Week</h2>
    <p>Here the Leader Board of Game Quest for {{ startWeek }} to {{ endWeek }}.</p>
    <ul class="leaders" v-if="leaders.length">
      <li v-for="(user, index) in leaders" :key="user.id">
        <span class="rank">#{{ index + 1 }}</span>
        <span class="name">{{ user.username }}</span>
        <span class="points">{{ user.GamePoints }} pts</span>
      </li>
    </ul>
    <p v-else class="empty">No players yet.</p>
  </section>
</template>

<script>
import '@/style/leaderboard.css'

export default {
  data() {
    return {
        day: '',
        month: '',
        startWeek: '',
        endWeek: '',
        leaders: []
    }
  },
  created() {
    this.updateDate()
    setInterval(this.updateDate, 1000 * 60 * 60 * 24)
    this.findWeek()
    setInterval(this.findWeek, 1000 * 60 * 60 * 24)
    this.fetchLeaders()
  },
  methods: {
    async fetchLeaders() {
      try {
        const res = await fetch('http://localhost:4000/users')
        if (!res.ok) {
          console.error('Impossible de charger le classement')
          return
        }
        const users = await res.json()
        this.leaders = users
          .filter(u => typeof u.GamePoints === 'number')
          .sort((a, b) => b.GamePoints - a.GamePoints)
          .slice(0, 5)
      } catch (err) {
        console.error('Erreur réseau lors du chargement du classement', err)
      }
    },
    updateDate() {
      const today = new Date()

      // toLocaleDateString for 
      this.day = today.toLocaleDateString('fr-FR', {
        weekday: 'long',  
        day: 'numeric',  
        month: 'long',    
        year: 'numeric'   
      })

      this.month = today.toLocaleDateString('fr-FR', {
        month: 'long',
        year: 'numeric',
      })
    },

    findWeek(){
      const day = new Date()

      //day.getDay(): Integer between 0 and 6 0=Sunday, 1=Mondazy... and 6=Saturday.
      //day.getDate(): return the date
      const start = new Date(day.setDate(day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)))

      const end = new Date(start)
      end.setDate(start.getDate() + 6)

      this.startWeek = start.toLocaleDateString('fr-FR',{
        weekday: 'long',  
        day: 'numeric',  
        month: 'long',    
        year: 'numeric'   
      })

      this.endWeek = end.toLocaleDateString('fr-FR',{
        weekday: 'long',  
        day: 'numeric',  
        month: 'long',    
        year: 'numeric'   
      })
    }
  }
}
</script>

<style scoped>
</style>
