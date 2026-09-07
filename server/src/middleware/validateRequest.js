import { validationResult } from 'express-validator'

// Turns express-validator's error list into the { errors: { field: [msg] } }
// shape the React contact form already knows how to read.
export function validateRequest(req, res, next) {
  const result = validationResult(req)
  if (result.isEmpty()) return next()

  const errors = {}
  for (const err of result.array()) {
    const field = err.path || err.param
    if (!errors[field]) errors[field] = []
    errors[field].push(err.msg)
  }

  return res.status(422).json({ message: 'Validation failed', errors })
}
