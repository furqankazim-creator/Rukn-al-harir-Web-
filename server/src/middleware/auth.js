import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { db } from '../db/index.js'

// Verifies the Bearer JWT and attaches the current admin user to req.user.
export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    const user = db
      .prepare('SELECT id, name, email, role FROM users WHERE id = ?')
      .get(payload.sub)

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.user = user
    return next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
