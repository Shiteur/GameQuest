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
            const response = await fetch('http://localhost:4000/users')
            const users = await response.json()
            if (users.find(u => u.username === this.username)) {
                this.error = "This username is already taken."
                return
            }

            if (this.password !== this.confirmpassword) {
                this.error = "Passwords do not match." + this.confirmpassword + this.password
                return
            }

            const defaultAvatar= `https://api.dicebear.com/9.x/identicon/svg?seed=${this.username}`

            await fetch('http://localhost:4000/users', {
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
</style>
