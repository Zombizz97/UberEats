import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'
// eslint-disable-next-line sort-imports
import { fileURLToPath } from 'url'
// eslint-disable-next-line sort-imports
import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import restaurantsRouter from './routes/restaurants.js'
// eslint-disable-next-line sort-imports
import 'dotenv/config'

const app = express()

app.use(helmet())
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(morgan('dev'))

// eslint-disable-next-line one-var,no-undef
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/vuetify_project'
await mongoose.connect(mongoUri)

app.get('/health', (req, res) => res.json({ ok: true }))
app.use('/api/restaurants', restaurantsRouter)
app.use('/api/products', productsRouter)
app.use('/api/auth', authRouter)

// Servez le frontend Vite (client/dist) et fallback SPA
// eslint-disable-next-line one-var,no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url)),
 distPath = path.resolve(__dirname, '../../client/dist')
app.use(express.static(distPath))
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {return next()}
  return res.sendFile(path.join(distPath, 'index.html'))
})

// eslint-disable-next-line one-var,no-undef,no-magic-numbers
const port = process.env.PORT || 4000
// eslint-disable-next-line no-inline-comments
app.listen(port, () => { /* Empty */ })
