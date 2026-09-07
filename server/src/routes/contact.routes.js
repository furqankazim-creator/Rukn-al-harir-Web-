import { Router } from 'express'
import { body } from 'express-validator'
import { storeContact } from '../controllers/contact.controller.js'
import { validateRequest } from '../middleware/validateRequest.js'
import { contactLimiter } from '../middleware/rateLimiters.js'

const PROJECT_TYPES = ['mep', 'civil', 'project_support', 'alternative_energy', 'other']

const router = Router()

router.post(
  '/contact',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 150 }),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Enter a valid email').isLength({ max: 255 }),
    body('phone').optional({ values: 'falsy' }).isString().isLength({ max: 30 }),
    body('project_type').optional({ values: 'falsy' }).isIn(PROJECT_TYPES).withMessage('Invalid project type'),
    body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters'),
  ],
  validateRequest,
  storeContact
)

export default router
