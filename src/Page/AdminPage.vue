<template>
  <section class="admin">
    <h2>Users Management</h2>

    <table class="users-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Points</th>
          <th>Challenges Completed</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.username }}</td>
          <td>{{ u.email }}</td>
          <td>{{ u.GamePoints }}</td>

          <td>
            <ul>
              <li v-for="c in u.completedChallenges || []" :key="c">
                Challenge {{ c }}
                <button @click="unvalidateChallenge(u.id, c)" class="Challenge-btn">Unvalidate</button>
              </li>
            </ul>
          </td>

          <td>
            <button @click="deleteUser(u.id)" class="User-btn">Delete User</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return { users: [] }
  },
  async created() {
    await this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const res = await fetch("http://localhost:4000/users")
      this.users = await res.json()
    },

    async deleteUser(id) {
      const current = JSON.parse(localStorage.getItem("currentUser"))
      if (!current) return

      if (!confirm("Delete this user permanently?")) return

      await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
        headers: { "X-User-Id": current.id }
      })

      await this.fetchUsers()
    },

    async unvalidateChallenge(userId, challengeId) {
      const current = JSON.parse(localStorage.getItem("currentUser"))

      await fetch(`http://localhost:4000/users/${userId}/unvalidate/${challengeId}`, {
        method: "PATCH",
        headers: { "X-User-Id": current.id }
      })

      await this.fetchUsers()
    }
  }
}
</script>
<style scoped>

</style>
