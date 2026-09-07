import { Router } from 'express'
import { body } from 'express-validator'
import {
  listContacts,
  updateContactStatus,
  deleteContact,
} from '../../controllers/contacts.admin.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'

const STATUSES = ['new', 'read', 'replied']

const router = Router()
router.use(requireAdmin)

router.get('/', listContacts)

router.patch(
  '/:id',
  [body('status').isIn(STATUSES).withMessage('Invalid status')],
  validateRequest,
  updateContactStatus
)

router.delete('/:id', deleteContact)

export default router
