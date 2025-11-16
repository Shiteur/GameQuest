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

const readUsers = async () => {
  const raw = await readFile(USERS_PATH, 'utf-8')
  return JSON.parse(raw)
}

const writeUsers = data => writeFile(USERS_PATH, JSON.stringify(data, null, 2))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/users', async (req, res) => {
  try {
    const data = await readUsers()
    res.json(data.users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Impossible de lire users.json' })
  }
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Champs manquants' })
  }

  try {
    const data = await readUsers()

    if (data.users.some(u => u.username === username)) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà pris" })
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
    res.status(500).json({ error: "Impossible d'ajouter l'utilisateur" })
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const user = data.users.find(u => u.id === req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Impossible de lire users.json' })
  }
})

app.patch('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const index = data.users.findIndex(u => u.id === req.params.id)
    if (index === -1) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }
    data.users[index] = { ...data.users[index], ...req.body }
    await writeUsers(data)
    res.json(data.users[index])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur" })
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const data = await readUsers()
    const initialLength = data.users.length
    data.users = data.users.filter(u => u.id !== req.params.id)
    if (data.users.length === initialLength) {
      return res.status(404).json({ error: 'Utilisateur introuvable' })
    }
    await writeUsers(data)
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Impossible de supprimer l'utilisateur" })
  }
})

app.listen(4000, () => {
  console.log('API ready on http://localhost:4000')
})
