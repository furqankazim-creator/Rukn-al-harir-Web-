import { Router } from 'express'
import { body } from 'express-validator'
import {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/users.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'

const router = Router()
router.use(requireAdmin)

router.get('/', listUsers)

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 255 }),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email').isLength({ max: 255 }),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional({ values: 'falsy' }).isString().isLength({ max: 50 }),
  ],
  validateRequest,
  createUser
)

router.patch(
  '/:id',
  [
    body('name').optional({ values: 'falsy' }).isString().isLength({ max: 255 }),
    body('email').optional({ values: 'falsy' }).isEmail().withMessage('Enter a valid email').isLength({ max: 255 }),
    body('password').optional({ values: 'falsy' }).isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional({ values: 'falsy' }).isString().isLength({ max: 50 }),
  ],
  validateRequest,
  updateUser
)

router.delete('/:id', deleteUser)

export default router
