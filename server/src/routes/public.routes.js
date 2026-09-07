import { Router } from 'express'
import { db } from '../db/index.js'
import { listPublicGallery } from '../controllers/gallery.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

// Read-only, unauthenticated — lets the public site pull admin-managed
// content (gallery, site settings) without exposing the admin CRUD routes.
router.get('/gallery', listPublicGallery)

router.get(
  '/settings',
  asyncHandler(async (req, res) => {
    const rows = db.prepare('SELECT key, value FROM settings').all()
    res.json(Object.fromEntries(rows.map((r) => [r.key, r.value])))
  })
)

export default router
