import bcrypt from 'bcryptjs'
import { db } from './index.js'
import { env } from '../config/env.js'

export function seedAdmin() {
  const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count

  if (userCount > 0) return

  if (!env.adminEmail || !env.adminPassword) {
    console.warn('[seed] Skipped: no users exist yet and ADMIN_EMAIL/ADMIN_PASSWORD are not set in .env')
    return
  }

  const hash = bcrypt.hashSync(env.adminPassword, 10)
  db.prepare(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
  ).run(env.adminName, env.adminEmail, hash, 'admin')

  console.log(`[seed] Created initial admin user: ${env.adminEmail}`)
}

// Allow running directly: `npm run seed`
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedAdmin()
}
