import { db } from '../db/index.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listServices = asyncHandler(async (req, res) => {
  const services = db.prepare('SELECT * FROM services ORDER BY position ASC, id ASC').all()
  res.json(services)
})

export const createService = asyncHandler(async (req, res) => {
  const { title, description = null, icon = null, position = 0 } = req.body

  const info = db
    .prepare('INSERT INTO services (title, description, icon, position) VALUES (?, ?, ?, ?)')
    .run(title, description, icon, position)

  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(info.lastInsertRowid)
  res.status(201).json(service)
})

export const updateService = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Service not found')

  const next = {
    title: req.body.title ?? existing.title,
    description: req.body.description ?? existing.description,
    icon: req.body.icon ?? existing.icon,
    position: req.body.position ?? existing.position,
  }

  db.prepare(
    `UPDATE services SET title = ?, description = ?, icon = ?, position = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(next.title, next.description, next.icon, next.position, req.params.id)

  const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id)
  res.json(service)
})

export const deleteService = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT id FROM services WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Service not found')

  db.prepare('DELETE FROM services WHERE id = ?').run(req.params.id)
  res.json({ message: 'Service removed' })
})
