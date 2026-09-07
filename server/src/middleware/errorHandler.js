import multer from 'multer'
import { ApiError } from '../utils/ApiError.js'

export function notFound(req, res) {
  res.status(404).json({ message: 'Not found' })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
      ...(err.errors ? { errors: err.errors } : {}),
    })
  }

  // Multer upload failures (file too large, wrong type, etc.) → 422, not a 500.
  if (err instanceof multer.MulterError || err.isUploadValidation) {
    return res.status(422).json({ message: err.message, errors: { image: [err.message] } })
  }

  console.error(err)
  res.status(500).json({ message: 'Something went wrong. Please try again later.' })
}
