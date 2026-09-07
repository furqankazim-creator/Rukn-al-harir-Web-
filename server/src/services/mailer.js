import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

let transporter = null

function getTransporter() {
  if (!env.smtpHost) return null
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: env.smtpUser ? { user: env.smtpUser, pass: env.smtpPass } : undefined,
    })
  }
  return transporter
}

// Notifies the business of a new contact form submission. Silently skips
// (and logs) if SMTP isn't configured or sending fails — the submission is
// already persisted, so a mail hiccup should never break the API response.
export async function sendContactNotification(submission) {
  const t = getTransporter()
  if (!t) {
    console.warn('[mailer] SMTP not configured — skipping contact notification email')
    return
  }

  try {
    await t.sendMail({
      from: env.mailFrom,
      to: env.mailTo,
      replyTo: submission.email,
      subject: `New project inquiry — ${submission.project_type || 'General'}`,
      text: [
        `Name: ${submission.name}`,
        `Email: ${submission.email}`,
        `Phone: ${submission.phone || '—'}`,
        `Project Type: ${submission.project_type || '—'}`,
        '',
        submission.message,
      ].join('\n'),
    })
  } catch (err) {
    console.error('[mailer] Failed to send contact notification', err.message)
  }
}
