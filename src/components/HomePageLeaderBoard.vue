<template>
  <section class="LeaderBoard">
    <h2>Leader Board of the Week</h2>
    <p>Here the Leader Board of Game Quest for {{ startWeek }} to {{ endWeek }}.</p>

  </section>
</template>

<script>
export default {
  data() {
    return {
        day: '',
        month: '',
        startWeek: '',
        endWeek: '',
    }
  },
  created() {
    this.updateDate()
    setInterval(this.updateDate, 1000 * 60 * 60 * 24)
    this.findWeek()
    setInterval(this.findWeek, 1000 * 60 * 60 * 24)
  },
  methods: {
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
.LeaderBoard {
  padding: 3rem;
  background-color: #f9f9f9;
  text-align: center;
}
</style>