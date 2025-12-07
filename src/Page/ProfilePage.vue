<template>
  <section v-if="user">
    <h2>Profil of {{ user.username }}</h2>

    <div class="profile">
      <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="avatar"/>
      <p>Email : {{ user.email }}</p>
      <p>ID useur : {{ user.id }}</p>
      <p>Game Points : {{ user.GamePoints }}</p>

      <input type="file" @change="updateAvatar" /> <br />
      <button @click="logout">Logout</button>
      <button @click="deleteAccount">Delete this  account</button>
    </div>
  </section>

  <p v-else>User not found.</p>
</template>

<script>
import '@/style/profile.css'

export default {
  name: "ProfileView",
  data() {
    return {
      user: null
    }
  },
  async created() {
    const id = this.$route.params.id
    const res = await fetch(`http://localhost:4000/users/${id}`)
    this.user = await res.json()

    // Load current user from localStorage
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      this.user = JSON.parse(storedUser)
    }
  },
  methods: {
    async updateAvatar(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = async () => {
        this.user.avatar = reader.result

        await fetch(`http://localhost:4000/users/${this.user.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatar: this.user.avatar })
        })
      }
      reader.readAsDataURL(file)
    },
    logout() {
        if(confirm("Do you want to logout?")==true){
            localStorage.removeItem('currentUser')
            window.dispatchEvent(new Event('storage'))
            this.$router.push('/login')
        }  
    },
    async deleteAccount() {
      if (!confirm(" Do you really want to delete your account? This action is irreversible.")) {
        return
      }

      try { 
        await fetch(`http://localhost:4000/users/${this.user.id}`, {
          method: 'DELETE'
        })

        localStorage.removeItem('currentUser')
        window.dispatchEvent(new Event('storage'))
        alert('Your account has been successfully deleted.')
        this.$router.push('/register')
      } catch (error) {
        console.error("Error deleting account:", error)
        alert('An error occurred.')
      }
    }
  }
}
</script>

<style scoped>
</style>
