import { Router } from 'express'
import { body } from 'express-validator'
import {
  listGallery,
  createGalleryItems,
  updateGalleryItem,
  reorderGallery,
  deleteGalleryItem,
} from '../../controllers/gallery.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'
import { uploadGalleryImages } from '../../middleware/upload.js'

const router = Router()
router.use(requireAdmin)

router.get('/', listGallery)

router.post('/', uploadGalleryImages, createGalleryItems)

router.patch(
  '/:id',
  [
    body('caption').optional({ values: 'falsy' }).isString().isLength({ max: 255 }),
    body('position').optional({ values: 'falsy' }).isInt().toInt(),
    body('visible').optional().isBoolean().toBoolean(),
  ],
  validateRequest,
  updateGalleryItem
)

router.post(
  '/reorder',
  [
    body('order').isArray({ min: 1 }).withMessage('order must be a non-empty array'),
    body('order.*.id').isInt().toInt(),
    body('order.*.position').isInt().toInt(),
  ],
  validateRequest,
  reorderGallery
)

router.delete('/:id', deleteGalleryItem)

export default router
