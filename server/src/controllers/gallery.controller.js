import fs from 'node:fs'
import path from 'node:path'
import { db } from '../db/index.js'
import { galleryDir } from '../middleware/upload.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listGallery = asyncHandler(async (req, res) => {
  const items = db.prepare('SELECT * FROM gallery ORDER BY position ASC, id ASC').all()
  res.json(items.map(serialize))
})

// Public, unauthenticated read — only ever exposes visible items, and only
// the fields the public site actually needs (no timestamps/internal ids).
export const listPublicGallery = asyncHandler(async (req, res) => {
  const items = db
    .prepare('SELECT id, path, caption FROM gallery WHERE visible = 1 ORDER BY position ASC, id ASC')
    .all()
  res.json(items)
})

export const createGalleryItems = asyncHandler(async (req, res) => {
  const files = req.files || []
  if (files.length === 0) {
    throw new ApiError(422, 'No image uploaded', { image: ['No image uploaded'] })
  }

  const { caption = null, position = 0, visible = true } = req.body

  const insert = db.prepare(
    'INSERT INTO gallery (filename, path, caption, position, visible) VALUES (?, ?, ?, ?, ?)'
  )

  const created = files.map((file) => {
    const publicPath = `/uploads/gallery/${file.filename}`
    const info = insert.run(file.filename, publicPath, caption, position, visible ? 1 : 0)
    return serialize(db.prepare('SELECT * FROM gallery WHERE id = ?').get(info.lastInsertRowid))
  })

  res.status(201).json(created)
})

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Gallery item not found')

  const next = {
    caption: req.body.caption ?? existing.caption,
    position: req.body.position ?? existing.position,
    visible: req.body.visible ?? Boolean(existing.visible),
  }

  db.prepare(
    `UPDATE gallery SET caption = ?, position = ?, visible = ?, updated_at = datetime('now')
     WHERE id = ?`
  ).run(next.caption, next.position, next.visible ? 1 : 0, req.params.id)

  const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id)
  res.json(serialize(item))
})

export const reorderGallery = asyncHandler(async (req, res) => {
  const { order } = req.body

  const update = db.prepare('UPDATE gallery SET position = ? WHERE id = ?')
  const run = db.transaction((rows) => {
    for (const row of rows) update.run(row.position, row.id)
  })
  run(order)

  res.json({ message: 'Reordered' })
})

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Gallery item not found')

  const filePath = path.join(galleryDir, existing.filename)
  fs.rm(filePath, { force: true }, () => {})

  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id)
  res.json({ message: 'Removed' })
})

function serialize(row) {
  return { ...row, visible: Boolean(row.visible) }
}
