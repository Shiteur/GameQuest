<template>
    <section class="register">
        <h2>Inscription</h2> 
        <form @submit.prevent="registerUser">
            <div>
                <label>Username :</label>
                <input type="text" v-model="username" required />
            </div>

            <div>
                <label>Email :</label>
                <input type="email" v-model="email" required />
            </div>

            <div>
                <label>Password :</label>
                <input type="password" v-model="password" required />
            </div>

            <div>
                <label>Confirm Password :</label>
                <input type="password" v-model="confirmpassword" required />
            </div>

            <p v-if="error" class="error">{{ error}}</p>

            <button type="submit">Register</button>

            <p>If you have already an account go  <RouterLink to="/login">here</RouterLink></p>
        </form>
    </section>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            error: ''
        }
    },
    methods: {
        async registerUser() {
            const response = await fetch('http://localhost:3000/users')
            const users = await response.json()
            if (users.find(u => u.username === this.username)) {
                this.error = "Ce nom d'utilisateur existe déjà."
                return
            }

            if (this.password !== this.confirmPassword) {
                this.error = "Les mots de passe ne correspondent pas."
                return
            }

            const defaultAvatar= `https://api.dicebear.com/9.x/identicon/svg?seed=${this.username}`

            await fetch('http://localhost:3000/users', {
                method: 'POST',headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username: this.username,email: this.email,password: this.password,avatar: defaultAvatar, GamePoints: 0})
            })
            
            alert('Registration succecfully')
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.register {
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 1rem;
}
.register label {
  display: block;
  margin-bottom: 0.5rem;
}
.register input {
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