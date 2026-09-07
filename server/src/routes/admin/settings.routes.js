import { Router } from 'express'
import { body } from 'express-validator'
import { getSettings, updateSettings } from '../../controllers/settings.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'

const router = Router()
router.use(requireAdmin)

router.get('/', getSettings)

router.patch(
  '/',
  [
    body('site_title').optional({ values: 'falsy' }).isString().isLength({ max: 255 }),
    body('primary_color').optional({ values: 'falsy' }).isString().isLength({ max: 20 }),
    body('footer_text').optional({ values: 'falsy' }).isString().isLength({ max: 500 }),
    body('maintenance_mode').optional().isBoolean().toBoolean(),
  ],
  validateRequest,
  updateSettings
)

export default router
