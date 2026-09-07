import { env } from './config/env.js'
import './db/index.js'
import { seedAdmin } from './db/seed.js'
import { app } from './app.js'

seedAdmin()

app.listen(env.port, () => {
  console.log(`Rukn Al Harir API listening on http://localhost:${env.port}`)
})
