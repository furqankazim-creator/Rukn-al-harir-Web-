import bcrypt from 'bcryptjs'
import { app } from '../src/app.js'
import { db } from '../src/db/index.js'

export { app, db }

let counter = 0

// Cheap-hash a test admin directly into the DB (skips the real bcrypt cost
// factor so the suite stays fast) and return its plaintext credentials.
export function createTestAdmin(overrides = {}) {
  counter += 1
  const email = overrides.email || `test-admin-${counter}@example.com`
  const password = overrides.password || 'TestPass123!'
  const name = overrides.name || 'Test Admin'

  const hash = bcrypt.hashSync(password, 4)
  db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    name,
    email,
    hash,
    'admin'
  )

  return { email, password, name }
}
