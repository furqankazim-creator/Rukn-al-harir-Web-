import { db } from '../db/index.js'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listContacts = asyncHandler(async (req, res) => {
  const submissions = db
    .prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC')
    .all()
  res.json(submissions)
})

export const updateContactStatus = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT id FROM contact_submissions WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Submission not found')

  db.prepare('UPDATE contact_submissions SET status = ? WHERE id = ?').run(
    req.body.status,
    req.params.id
  )

  const submission = db
    .prepare('SELECT * FROM contact_submissions WHERE id = ?')
    .get(req.params.id)
  res.json(submission)
})

export const deleteContact = asyncHandler(async (req, res) => {
  const existing = db.prepare('SELECT id FROM contact_submissions WHERE id = ?').get(req.params.id)
  if (!existing) throw new ApiError(404, 'Submission not found')

  db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id)
  res.json({ message: 'Submission removed' })
})
