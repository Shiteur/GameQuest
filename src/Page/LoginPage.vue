<template>
    <section class="login">
        <h2>Connexion</h2>
        <form @submit.prevent="loginUser">
            <div>
                <label>Username :</label>
                <input type="text" v-model="username" required />
            </div>

            <div>
                <label>Password :</label>
                <input type="password" v-model="password" required />
            </div>

            <p v-if="error" class="error">{{ error }}</p>

            <button type="submit">Login</button>

            <p>If you din't have an account, go create one <RouterLink to="/register">here</RouterLink></p>
        </form>
    </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async loginUser() {
      const response = await fetch('http://localhost:4000/users')
      const users = await response.json()
      const user = users.find(u => u.username === this.username)
      if (!user) {
        this.error = "This username don't exit!"
        return
      }

      if (user.password !== this.password) {
        this.error = "Wrong password or username!"
        return
      }

      localStorage.setItem('currentUser', JSON.stringify(user))
      window.dispatchEvent(new Event('storage'))
      this.$router.push('/')
    }

  }
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 1rem;
}
.login label {
  display: block;
  margin-bottom: 0.5rem;
}
.login input {
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.error {
  color: red;
  margin-bottom: 1rem;
}
button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
button:hover {
  background-color: #357ab7;
}
</style>
