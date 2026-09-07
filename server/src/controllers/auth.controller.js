import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db/index.js'
import { env } from '../config/env.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  const valid = user && bcrypt.compareSync(password, user.password)

  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
})

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user })
})

export const stats = asyncHandler(async (req, res) => {
  const users = db.prepare('SELECT COUNT(*) AS n FROM users').get().n
  const contacts = db.prepare('SELECT COUNT(*) AS n FROM contact_submissions').get().n
  const newContacts = db
    .prepare("SELECT COUNT(*) AS n FROM contact_submissions WHERE status = 'new'")
    .get().n
  const services = db.prepare('SELECT COUNT(*) AS n FROM services').get().n
  const gallery = db.prepare('SELECT COUNT(*) AS n FROM gallery').get().n

  res.json({ users, contacts, newContacts, services, gallery })
})
