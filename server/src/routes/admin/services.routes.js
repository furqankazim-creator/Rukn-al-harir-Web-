import { Router } from 'express'
import { body } from 'express-validator'
import {
  listServices,
  createService,
  updateService,
  deleteService,
} from '../../controllers/services.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'

const router = Router()
router.use(requireAdmin)

router.get('/', listServices)

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
    body('description').optional({ values: 'falsy' }).isString().isLength({ max: 2000 }),
    body('icon').optional({ values: 'falsy' }).isString().isLength({ max: 255 }),
    body('position').optional({ values: 'falsy' }).isInt().toInt(),
  ],
  validateRequest,
  createService
)

router.patch(
  '/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 255 }),
    body('description').optional({ values: 'falsy' }).isString().isLength({ max: 2000 }),
    body('icon').optional({ values: 'falsy' }).isString().isLength({ max: 255 }),
    body('position').optional({ values: 'falsy' }).isInt().toInt(),
  ],
  validateRequest,
  updateService
)

router.delete('/:id', deleteService)

export default router
