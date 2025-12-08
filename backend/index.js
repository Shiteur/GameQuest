import express from 'express'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

const app = express()
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
app.use(express.json())

const DATA_DIR = path.resolve('data')
const USERS_PATH = path.join(DATA_DIR, 'users.json')
const GAMES_PATH = path.join(DATA_DIR, 'games.json')
const CHALLENGES_PATH = path.join(DATA_DIR, 'challenges.json')

const normalizeKey = value =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')

const readUsers = async () => {
  const raw = await readFile(USERS_PATH, 'utf-8')
  return JSON.parse(raw)
}

const writeUsers = data => writeFile(USERS_PATH, JSON.stringify(data, null, 2))

const readGames = async () => {
  const raw = await readFile(GAMES_PATH, 'utf-8')
  const data = JSON.parse(raw)
  return data.games || []
}

const readChallenges = async () => {
  const raw = await readFile(CHALLENGES_PATH, 'utf-8')
  const data = JSON.parse(raw)
  return data.challenges || []
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/users', async (req, res) => {
  try {
    const data = await readUsers()
    res.json(data.users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Can't read users.json" })
  }
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    const data = await readUsers()

    if (data.users.some(u => u.username === username)) {
      return res.status(400).json({ error: "Username already taken" })
    }

    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${username}`,
      GamePoints: 0
    }

    data.users.push(newUser)
    await writeUsers(data)

    res.status(201).json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unable to add user" })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const user = data.users.find(u => u.id === req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Can't read users.json" })
  }
})

app.patch('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const index = data.users.findIndex(u => u.id === req.params.id)
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' })
    }
    data.users[index] = { ...data.users[index], ...req.body }
    await writeUsers(data)
    res.json(data.users[index])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unable to update user" })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const initialLength = data.users.length
    data.users = data.users.filter(u => u.id !== req.params.id)
    if (data.users.length === initialLength) {
      return res.status(404).json({ error: 'User not found' })
    }
    await writeUsers(data)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Unable to delete user" })
  }
})

app.get('/games', async (req, res) => {
  try {
    const games = await readGames()
    const { slug, name } = req.query

    if (slug || name) {
      const needle = normalizeKey(slug || name)
      const game = games.find(g => {
        const gameSlug = normalizeKey(g.slug)
        const gameName = normalizeKey(g.name)
        return gameSlug === needle || gameName === needle
      })
      if (!game) {
        return res.status(404).json({ error: 'Game not found.' })
      }
      return res.json(game)
    }

    res.json(games)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Can't read games.json" })
  }
})

app.get('/challenges', async (req, res) => {
  try {
    const { game } = req.query
    const challenges = await readChallenges()
    if (!game) {
      return res.json(challenges)
    }
    const key = normalizeKey(game)
    const filtered = challenges.filter(ch => normalizeKey(ch.game) === key)
    res.json(filtered)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Can't read challenges.json" })
  }
})

app.listen(4000, () => {
  console.log('API ready on http://localhost:4000')
})
