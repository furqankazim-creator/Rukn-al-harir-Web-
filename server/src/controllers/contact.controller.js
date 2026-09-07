import { db } from '../db/index.js'
import { sendContactNotification } from '../services/mailer.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const storeContact = asyncHandler(async (req, res) => {
  const { name, email, phone, project_type, message } = req.body

  const info = db
    .prepare(
      `INSERT INTO contact_submissions (name, email, phone, project_type, message, ip_address)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(name, email, phone || null, project_type || 'other', message, req.ip)

  const submission = { id: info.lastInsertRowid, name, email, phone, project_type, message }

  // Fire-and-forget — a mail failure must not fail the API response.
  sendContactNotification(submission)

  res.status(201).json({
    message: 'Thank you for your inquiry. We will be in touch shortly.',
    id: submission.id,
  })
})
