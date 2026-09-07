import { Router } from 'express'
import { body } from 'express-validator'
import { login, me, stats } from '../../controllers/auth.controller.js'
import { validateRequest } from '../../middleware/validateRequest.js'
import { requireAdmin } from '../../middleware/auth.js'
import { loginLimiter } from '../../middleware/rateLimiters.js'

const router = Router()

router.post(
  '/login',
  loginLimiter,
  [
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  login
)

router.get('/me', requireAdmin, me)
router.get('/stats', requireAdmin, stats)

export default router
