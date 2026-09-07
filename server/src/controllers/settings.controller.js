import { db } from '../db/index.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const EDITABLE_KEYS = ['site_title', 'primary_color', 'footer_text', 'maintenance_mode']

export const getSettings = asyncHandler(async (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all()
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]))
  res.json(settings)
})

export const updateSettings = asyncHandler(async (req, res) => {
  const upsert = db.prepare(
    `INSERT INTO settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`
  )

  const run = db.transaction(() => {
    for (const key of EDITABLE_KEYS) {
      if (req.body[key] === undefined) continue
      const value = req.body[key]
      upsert.run(key, value === null ? '' : String(value))
    }
  })
  run()

  res.json({ message: 'Settings saved' })
})
