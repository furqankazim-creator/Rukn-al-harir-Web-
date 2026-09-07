import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const app = express()

app.set('trust proxy', 1)

app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(
  cors({
    // In dev, also accept any localhost/127.0.0.1 port — Vite picks a
    // different one whenever 5173 is already taken, which otherwise turns
    // into a silent, confusing CORS failure on every admin API call.
    origin: env.isProd
      ? env.corsOrigins
      : (origin, callback) => {
          const isLocalhost = !origin || /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)
          callback(null, isLocalhost || env.corsOrigins.includes(origin))
        },
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!env.isProd) {
  app.use(morgan('dev'))
}

// Publicly served uploaded gallery images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)
