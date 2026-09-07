import bcrypt from 'bcryptjs'
import { db } from '../db/index.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listUsers = asyncHandler(async (req, res) => {
  const users = db
    .prepare('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC')
    .all()
  res.json(users)
})

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'admin' } = req.body

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) throw new ApiError(422, 'Validation failed', { email: ['Email is already in use'] })

  const hash = bcrypt.hashSync(password, 10)
  const info = db
    .prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)')
    .run(name, email, hash, role)

  const user = db
    .prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?')
    .get(info.lastInsertRowid)

  res.status(201).json(user)
})

export const updateUser = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'User not found')

  if (req.body.email && req.body.email !== existing.email) {
    const emailTaken = db
      .prepare('SELECT id FROM users WHERE email = ? AND id != ?')
      .get(req.body.email, req.params.id)
    if (emailTaken) throw new ApiError(422, 'Validation failed', { email: ['Email is already in use'] })
  }

  const next = {
    name: req.body.name ?? existing.name,
    email: req.body.email ?? existing.email,
    role: req.body.role ?? existing.role,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : existing.password,
  }

  db.prepare(
    `UPDATE users SET name = ?, email = ?, role = ?, password = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(next.name, next.email, next.role, next.password, req.params.id)

  const user = db
    .prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?')
    .get(req.params.id)
  res.json(user)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'User not found')

  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  res.json({ message: 'User removed' })
})
