import { Router } from 'express'

const router = Router()

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Rukn Al Harir API' })
})

export default router
