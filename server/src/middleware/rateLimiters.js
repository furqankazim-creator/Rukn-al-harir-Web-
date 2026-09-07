import rateLimit from 'express-rate-limit'

// 5 submissions per IP per minute — matches the limit the frontend's
// Contact page already has a 429 fallback (mailto link) for.
export const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    const resetMs = req.rateLimit?.resetTime ? req.rateLimit.resetTime.getTime() - Date.now() : 60000
    const seconds = Math.max(1, Math.ceil(resetMs / 1000))
    res.status(429).json({
      message: `Too many requests. Please try again in ${seconds} seconds.`,
    })
  },
})

// Generous limiter for the admin login endpoint to slow down brute-forcing.
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many login attempts. Please try again later.' })
  },
})
